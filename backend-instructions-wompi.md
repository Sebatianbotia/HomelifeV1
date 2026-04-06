# Requerimientos para Backend (WordPress Headless) - Retomada de Pagos (Wompi)

Este documento describe exactamente lo que se necesita desarrollar en el entorno del Backend (WordPress/WooCommerce) para que el nuevo botón "Pagar Ahora" del Frontend (React) funcione correctamente.

El Frontend ya está configurado para consumir el endpoint que se detalla a continuación. Solo falta implementarlo en el código del servidor (usualmente en el archivo de tu plugin personalizado o en `functions.php`).

---

## 1. Nuevo Endpoint REST
Se debe crear un endpoint protegido, diseñado para iniciar un pago sobre un pedido **existente**.

- **URL:** `POST /wp-json/homelife/v1/reintentar-pago`
- **Autenticación requerida:** Sí (JWT Auth u otro sistema que valide al usuario logueado en WordPress usando el header `Authorization`).

### Estructura de la Petición a Recibir (Request Body):
```json
{
  "order_id": 1234
}
```

---

## 2. Validaciones Críticas a Programar
Dentro de la función PHP que controle este endpoint, el backend **debe** realizar las siguientes validaciones:

1. **Existe el pedido:** Verificar si el objeto del pedido (orden WC) se carga correctamente con ese ID.
2. **Autoría del pedido:** Confirmar que `get_current_user_id()` sea **exactamente igual** a `$order->get_customer_id()`. *(Si no coinciden, retornar Error 401/403. Esto evita que otro usuario pague o consulte el total de un pedido ajeno).*
3. **Estado del pedido:** Constatar que el estado `$order->get_status()` sea `pending` (Pendiente de pago) o `failed` (Fallido). Si ya está `processing` o `completed`, debe bloquearse con un error.

---

## 3. Lógica de Referencia Única y Cálculo Wompi
En Wompi, el ID de transacción o "Referencia" (`reference`) debe ser **ÚNICO**. Si se manda a pagar una referencia que previamente ya se intentó pagar y se abandonó o rechazó, Wompi dará un error en el widget y no dejará proceder.

**Pasos requeridos en el Backend:**
1. Obtén el total del pedido de WooCommerce: `$total = $order->get_total();`
2. Conviértelo a centavos y conviertelo en un entero puro: `$amount_in_cents = intval(round($total * 100));`
3. **Genera la Nueva Referencia Dinámica**: No puedes usar solo el número del pedido. Se recomienda hacer un *append* de la fecha y hora o un identificador único por intento. Por ejemplo: 
   `$nueva_referencia = 'HOMELIFE-' . $order->get_id() . '-RETRY-' . time();`
   *(Asegúrate de que este prefijo y nombre coincidan con cómo los parseas actualmente).*
4. **Calcula la Firma de Integridad (Signature)**:
   Debes volver a generar el SHA256 tomando los valores de este intento:
   `$integrity_string = $nueva_referencia . $amount_in_cents . 'COP' . $tu_secreto_de_integridad_wompi;`
   `$signature = hash('sha256', $integrity_string);`

---

## 4. Respuesta Esperada por el Frontend (Response)
El backend debe retornar en formato JSON un objeto `wompi` idéntico al que entregaba al momento de crear un pedido por primera vez.

```json
{
  "success": true,
  "wompi": {
    "public_key": "pub_prod_...tu_llave_publica...",
    "currency": "COP",
    "amount_in_cents": 15000000,
    "reference": "HOMELIFE-1234-RETRY-169827361",
    "signature": "1c2f34feab...hash..."
  }
}
```

---

## 5. Actualización en el Webhook de Servidor (Eventos Wompi)
Tu webhook actual (donde recibes el POST desde Wompi cuando una transacción es aprobada) recibe una referencia como `HOMELIFE-1234`. 
Como ahora va a recibir referencias del tipo `HOMELIFE-1234-RETRY-169827361`, debes adaptar tu código para que "limpie" o separe ese string y extraiga unicamente `1234` al momento de buscar el Pedido dentro de WooCommerce para marcarle su estado local como Procesando.

*(Ejemplo en PHP)*:
```php
$reference_received = $wompi_data['data']['transaction']['reference'];

// Separamos en un Array. El Index 0 sería "HOMELIFE", el index 1 sería el order_id, etc. 
$parts = explode('-', $reference_received);

// Asumiendo que tu referencia siembre empieza con HOMELIFE-
$order_id = $parts[1]; 

$order = wc_get_order($order_id);
// Lógica para cambiar estado...
```
*(Valida tu propio sistema de prefijos y ajusta el regex/explode según corresponda).*

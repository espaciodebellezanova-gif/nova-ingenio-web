// Destino futuro: completar solo con una URL HTTPS aprobada. No habilita autenticación.
export const clientUrl = "";
export const perspectives = {
  operar: {
    title: "Tu jornada",
    state: "Vista ilustrativa",
    description:
      "Una forma de visualizar la agenda y la continuidad de cada atención.",
    records: [
      {
        marker: "09:00",
        title: "Atención de ejemplo",
        detail: "Persona ficticia A · Servicio de 60 min",
        state: "Planificada",
      },
      {
        marker: "10:30",
        title: "Seguimiento de ejemplo",
        detail: "Persona ficticia B · Continuidad",
        state: "Por revisar",
      },
      {
        marker: "12:00",
        title: "Un espacio disponible",
        detail: "Pausa en la jornada ilustrativa",
        state: "Tiempo libre",
      },
    ],
  },
  crecer: {
    title: "Ideas con propósito",
    state: "Ejemplo manual / local",
    description:
      "Registros ficticios del alcance manual. Sin IA, envíos ni publicación automática.",
    records: [
      {
        marker: "01",
        title: "Campaña de temporada",
        detail: "Ejemplo de planificación manual",
        state: "Borrador",
      },
      {
        marker: "02",
        title: "Una idea para compartir",
        detail: "Director Creativo · Composición local",
        state: "En revisión",
      },
      {
        marker: "03",
        title: "Retomar una conversación",
        detail: "Seguimiento comercial ficticio",
        state: "Tarea manual",
      },
    ],
  },
  gestionar: {
    title: "Tus productos y movimientos",
    state: "Vista ficticia · V1 en validación",
    description:
      "Ejemplo ilustrativo del catálogo, las ventas y el inventario. Sin conexión a datos ni cobros reales.",
    records: [
      {
        marker: "01",
        title: "Producto de ejemplo",
        detail: "Catálogo ficticio · Variante y precio",
        state: "Registrado",
      },
      {
        marker: "02",
        title: "Venta de ejemplo",
        detail: "Movimiento simulado · Sin pago externo",
        state: "En revisión",
      },
      {
        marker: "03",
        title: "Traslado de stock",
        detail: "Sede ficticia A a sede ficticia B",
        state: "Pendiente",
      },
    ],
  },
};

export const whatsappLink = (message) =>
  "https://wa.me/5491126769136?" +
  new URLSearchParams({ text: message }).toString();

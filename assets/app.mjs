import { clientUrl, perspectives, whatsappLink } from "./content.mjs";

document.documentElement.classList.add("js");

const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector("#navigation");
function closeMenu() {
  menuButton.setAttribute("aria-expanded", "false");
  navigation.classList.remove("is-open");
}
menuButton.addEventListener("click", () => {
  const open = menuButton.getAttribute("aria-expanded") !== "true";
  menuButton.setAttribute("aria-expanded", String(open));
  navigation.classList.toggle("is-open", open);
});
navigation
  .querySelectorAll("a")
  .forEach((link) => link.addEventListener("click", closeMenu));
document.addEventListener("keydown", (event) => {
  if (
    event.key === "Escape" &&
    menuButton.getAttribute("aria-expanded") === "true"
  ) {
    closeMenu();
    menuButton.focus();
  }
});
matchMedia("(min-width: 601px)").addEventListener("change", closeMenu);

const tabs = [...document.querySelectorAll("[data-demo]")];
const panel = document.querySelector("#demo-content");
function element(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text) node.textContent = text;
  return node;
}
function showPerspective(key) {
  const content = perspectives[key];
  tabs.forEach((tab) => {
    const selected = tab.dataset.demo === key;
    tab.setAttribute("aria-selected", String(selected));
    tab.tabIndex = selected ? 0 : -1;
  });
  panel.setAttribute("aria-labelledby", `tab-${key}`);
  const heading = element("div", "demo-content-top");
  heading.append(
    element("h3", "", content.title),
    element("span", "status", content.state),
  );
  panel.replaceChildren(
    heading,
    element("p", "demo-subtitle", content.description),
  );
  for (const record of content.records) {
    const row = element("div", "demo-record");
    const copy = element("div", "record-copy");
    copy.append(
      element("b", "", record.title),
      element("span", "", record.detail),
    );
    row.append(
      element("span", "record-time", record.marker),
      copy,
      element("span", "record-status", record.state),
    );
    panel.append(row);
  }
}
tabs.forEach((tab, index) => {
  tab.addEventListener("click", () => showPerspective(tab.dataset.demo));
  tab.addEventListener("keydown", (event) => {
    let next;
    if (event.key === "ArrowRight") next = (index + 1) % tabs.length;
    if (event.key === "ArrowLeft")
      next = (index + tabs.length - 1) % tabs.length;
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = tabs.length - 1;
    if (next !== undefined) {
      event.preventDefault();
      showPerspective(tabs[next].dataset.demo);
      tabs[next].focus();
    }
  });
});
showPerspective("operar");

const dialog = document.querySelector("#client-dialog");
let dialogTrigger;
document.querySelectorAll("[data-client]").forEach((button) => {
  button.addEventListener("click", () => {
    if (clientUrl) {
      try {
        const target = new URL(clientUrl);
        if (
          target.protocol === "https:" &&
          !target.username &&
          !target.password
        ) {
          location.assign(target.href);
          return;
        }
      } catch {
        /* Un destino inválido conserva el estado informativo local. */
      }
    }
    dialogTrigger = button;
    dialog.showModal();
    document.body.classList.add("modal-open");
  });
});
dialog
  .querySelectorAll(".dialog-close, .dialog-done")
  .forEach((button) => button.addEventListener("click", () => dialog.close()));
dialog.addEventListener("close", () => {
  document.body.classList.remove("modal-open");
  dialogTrigger?.focus();
});

const form = document.querySelector("#demo-form");
const status = document.querySelector("#form-status");
const whatsappReady = document.querySelector("#whatsapp-ready");
const required = ["name", "business", "email"];
function validate(id) {
  const field = form.elements.namedItem(id);
  let message = "";
  if (!field.value.trim()) message = "Completá este campo.";
  else if (id === "email" && !field.validity.valid)
    message = "Ingresá un email válido, por ejemplo: nombre@negocio.test.";
  field.setAttribute("aria-invalid", String(Boolean(message)));
  document.querySelector(`#${id}-error`).textContent = message;
  return !message;
}
form.addEventListener("submit", (event) => {
  event.preventDefault();
  whatsappReady.hidden = true;
  whatsappReady.removeAttribute("href");
  const invalid = required.filter((id) => !validate(id));
  if (invalid.length) {
    status.textContent =
      "Revisá los campos indicados. No se envió ningún dato.";
    form.elements.namedItem(invalid[0]).focus();
    return;
  }
  const field = (name) => form.elements.namedItem(name).value.trim();
  const interest =
    form.elements.namedItem("interest").selectedOptions[0].textContent;
  const message = [
    "Hola, NOVA Ingenio. Quisiera consultar por una demostración.",
    `Nombre: ${field("name")}`,
    `Negocio: ${field("business")}`,
    `Email: ${field("email")}`,
    `Interés: ${interest}`,
    field("message") ? `Consulta: ${field("message")}` : "",
    "Entiendo que la suscripción todavía no está habilitada.",
  ]
    .filter(Boolean)
    .join("\n");
  const url = whatsappLink(message);
  whatsappReady.href = url;
  whatsappReady.hidden = false;
  status.textContent =
    "Mensaje preparado. Confirmá el envío en WhatsApp: el contacto no recibe tu consulta hasta que pulses Enviar allí. Si no se abre otra pestaña, usá el enlace de abajo. NOVA no recibió ni guardó el formulario.";
  window.open(url, "_blank", "noopener,noreferrer");
});
form.addEventListener("input", (event) => {
  status.textContent = "";
  whatsappReady.hidden = true;
  whatsappReady.removeAttribute("href");
  if (
    required.includes(event.target.id) &&
    event.target.hasAttribute("aria-invalid")
  )
    validate(event.target.id);
});
// Con JavaScript desactivado tampoco se permite un envío HTML accidental.
form.querySelector("[type=submit]").disabled = false;

function revealFeature() {
  const target = document.getElementById(location.hash.slice(1));
  if (target?.matches(".feature-details details")) target.open = true;
}
window.addEventListener("hashchange", revealFeature);
revealFeature();

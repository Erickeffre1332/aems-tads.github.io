/*Estrelas de avaliação*/
const openBtn = document.getElementById("openRating");
const closeBtn = document.getElementById("closeRating");
const stars = document.getElementById("stars");

openBtn.addEventListener("click", () => {
    stars.classList.add("open");
});

closeBtn.addEventListener("click", () => {
    stars.classList.remove("open");
});

/*Envio avaliação p/ formulario*/
const formURL = "https://docs.google.com/forms/d/e/1FAIpQLSfI2NzkjYZ4WHdTw7-qTw-lERDfXlVpr7m7hIO1ChrxGneKMw/formResponse"; /*Link Form*/
const entryID = "entry.971847553"; /*Código da pergunta*/

const submitButton = document.getElementById("submitRating");

submitButton.addEventListener("click", () => {
    const selected = document.querySelector('input[name="rate"]:checked');

    if (!selected) {
        alert("Por favor, selecione uma avaliação antes de enviar.");
    return;
}

const formData = new FormData();
formData.append(entryID, selected.value);

fetch(formURL, {
    method: "POST",
    mode: "no-cors",
    body: formData
})
.then(() => {
    alert("✅ Avaliação enviada com sucesso!");
    document.getElementById("stars").classList.remove("open"); /*Fecha o pop-up*/
})
.catch(() => {
    alert("❌ Erro ao enviar a avaliação.");
});
  });

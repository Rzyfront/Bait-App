

<div>
	<h2>¡Reclama tu Restaurante Aqui!</h2>

	<form id="contact-form" class="contact-form">
		<div class="form-group">
			<label for="name" class="label">Nombre Representante:</label>
			<input type="text" id="name" name="name" required class="input"/>
		</div>

        <div class="form-group">
			<label for="name" class="label">Nombre del Local:</label>
			<input type="text" id="name" name="name" required class="input"/>
		</div>

		<div class="form-group">
			<label for="email" class="label">Correo electrónico:</label>
			<input type="email" id="email" name="email" required class="input"/>
		</div>

		<div class="form-group">
			<label for="message" class="label">Mensaje:</label>
			<textarea id="message" name="message" required class="textarea"></textarea>
		</div>

		<div class="form-group">
			<label for="attachment1" class="label">Adjunte su DNI:</label>
			<input type="file" id="attachment1" name="attachment1" accept=".pdf,.jpg,.jpeg,.png,.doc,.docx" class="file-input"/>
		</div>

		<div class="form-group">
			<label for="attachment2" class="label">Adjunte el CCUI:</label>
			<input type="file" id="attachment2" name="attachment2" accept=".pdf,.jpg,.jpeg,.png,.doc,.docx" class="file-input"/>
		</div>

		<button type="submit" class="button">Enviar</button>
	</form>

	<script src="https://cdn.emailjs.com/sdk/2.3.2/email.min.js"></script>
	<script>
		// Configurar EmailJS
		emailjs.init('user_xxxxxxx'); // Reemplaza user_xxxxxxx con tu User ID de EmailJS

		// Agregar un evento de escucha para enviar el correo electrónico
		document.getElementById('contact-form').addEventListener('submit', function(event) {
			event.preventDefault();

			const name = document.getElementById('name').value;
			const email_address = document.getElementById('email').value;
			const subject = document.getElementById('subject').value;
			const message = document.getElementById('message').value;
			const attachment1 = document.getElementById('attachment1').files[0];
			const attachment2 = document.getElementById('attachment2').files[0];

			// Crear un objeto FormData para enviar el correo electrónico
			const form_data = new FormData();
			form_data.append('name', name);
			form_data.append('email', email_address);
			form_data.append('subject', subject);
			form_data.append('message', message);
			if (attachment1) {
				form_data.append('attachment1', attachment1, attachment1.name);
			}
			if (attachment2) {
				form_data.append('attachment2', attachment2, attachment2.name);
			}

			// Enviar el correo electrónico utilizando EmailJS
			emailjs.send('service')
        </script>
</div>


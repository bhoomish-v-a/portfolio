// Initialize EmailJS with your user ID
emailjs.init('QFUNrX4-YVF1tVO2y'); // Replace with your actual user ID

$(function() {
  // Initialize jqBootstrapValidation
  $("#contactForm input, #contactForm textarea").jqBootstrapValidation({
    preventSubmit: true,
    submitError: function($form, event, errors) {
      // Additional error messages or events
    },
    submitSuccess: function($form, event) {
      event.preventDefault(); // Prevent default submit behavior
      // Get values from FORM
      var name = $("input#name").val();
      var email = $("input#email").val();
      var phone = $("input#phone").val();
      var message = $("textarea#message").val();
      var firstName = name; // For Success/Failure Message

      // Check for white space in name for Success/Fail message
      if (firstName.indexOf(' ') >= 0) {
        firstName = name.split(' ').slice(0, -1).join(' ');
      }

      $this = $("#sendMessageButton");
      $this.prop("disabled", true); // Disable submit button until AJAX call is complete to prevent duplicate messages

      // Prepare data for EmailJS
      var templateParams = {
        name: name,
        email: email,
        phone: phone,
        message: message
      };

      // Using EmailJS for sending emails
      emailjs.send('service_sfvli6h', 'template_ttemf9t', templateParams)
        .then(function(response) {
          console.log('SUCCESS!', response.status, response.text);

          $('#success').html("<div class='alert alert-success'>");
          $('#success > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;</button>")
            .append("</button>");
          $('#success > .alert-success')
            .append("<strong>Your message has been sent. </strong>");
          $('#success > .alert-success')
            .append('</div>');

          $('#contactForm').trigger("reset"); // Clear all fields
        }, function(error) {
          console.log('FAILED...', error);
          $('#success').html("<div class='alert alert-danger'>");
          $('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;</button>")
            .append("</button>");
          $('#success > .alert-danger').append($("<strong>").text("Sorry " + firstName + ", it seems that my mail server is not responding. Please try again later!"));
          $('#success > .alert-danger').append('</div>');

          $('#contactForm').trigger("reset"); // Clear all fields
        })
        .finally(function() {
          setTimeout(function() {
            $this.prop("disabled", false); // Re-enable submit button when AJAX call is complete
          }, 1000);
        });
    },
    filter: function() {
      return $(this).is(":visible");
    },
  });

  // Initialize Bootstrap tabs
  $("a[data-toggle='tab']").click(function(e) {
    e.preventDefault();
    $(this).tab("show");
  });
});

// Clear success/fail messages when name field gains focus
$('#name').focus(function() {
  $('#success').html('');
});

// Email validation function
function validate() {
  var text = document.getElementById('email').value; // Use correct ID
  console.log('Input Value:', text);
  var regx = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  console.log('Regex Test Result:', regx.test(text));

  if (text === '') {
    document.getElementById('text2').style.visibility = 'hidden';
  } else {
    if (regx.test(text)) {
      document.getElementById('text2').innerHTML = "Valid";
      document.getElementById('text2').style.visibility = 'visible';
      document.getElementById('text2').style.color = 'green';
    } else {
      document.getElementById('text2').innerHTML = "Invalid";
      document.getElementById('text2').style.visibility = 'visible';
      document.getElementById('text2').style.color = 'red';
    }
  }
}

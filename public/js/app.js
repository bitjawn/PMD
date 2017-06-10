$(document)
.ready(function(){
  $('.view-profile').on('click', function(){
    var $pId = $(this).data('id');
    var $url = '/profiles/profile/' + $pId;

    // console.log('Profile ID: ' + $pId + '\tProfile URL: ' + $url);

    $.ajax({
      type:'GET',
      url:$url,
      success:function(response) {
        window.location.href = '/profiles/profile/' + $pId;
      },
      error: function(err) {
        console.log(err);
      }
    });

  });

  $('.cancel-edit').on('click', function(){
    $url = '/profiles/profile/' + $(this).data('id');
    $.ajax({
      url:$url,
      type:'GET',
      success:function(response) {
        window.location.href = $url;
      },
      error:function(err) {
        console.log(err);
      }
    });
  });

  $('.delete-profile').on('click', function(){
    $pId = $(this).data('id');
    $url = '/profiles/profile/delete/' + $pId;

    if (confirm('Are you sure you want to delete this article?')) {
      $.ajax({
        url:$url,
        type:'DELETE',
        success:function(response) {
          window.location.href = '/profiles';
        },
        error: function(err) {
          console.log(err);
        }
      });
    }
  });

  $('#textInput').on('click', function(){
    addTextInput();
  });

  $('#passwordInput').on('click', function(){
    addPasswordInput();
  });

  $('#emailInput').on('click', function(){
    addEmailInput();
  });

})
.foundation()

function addTextInput() {
	var divParent = newElement('div'),
		span = newElement('span'),
        italic = newElement('i'),
		remove = newElement('span'),
        italicRemove = newElement('i'),
		input = newElement('input');

	var count = childCount(element('reg-form')) + 1,
        name = 'input' + count;

    if (confirm('Do you want to name the input?')) {
        var newName = prompt('Enter input name');
        if (newName.length) {
            name = newName;
        }
    }

    /*

        <div class="input-group" >
            <span class="input-group-label"><i class="fi-pencil"></i></span>
            <input class="input-group-field" type="text" placeholder="Name">
        </div>
    */

	addAttribute('class', 'input-group', divParent);
	addAttribute('class', 'input-group-label', span);
    addAttribute('class', 'fi-pencil', italic);

    addAttribute('class', 'input-group-field', input);
	addAttribute('placeholder', cfc(name), input);
    addAttribute('type', 'text', input);
    addAttribute('id', name, input);

	addAttribute('class', 'input-group-label', remove);
    addAttribute('class', 'fi-x', italicRemove);

	addAttribute('name', name, input);

	addHandler(remove, 'click', function() {
		element('reg-form').removeChild(divParent);
	});

    $(italic).appendTo(span);
    $(italicRemove).appendTo(remove);
    $(span).appendTo(divParent);
    $(input).appendTo(divParent);
    $(remove).appendTo(divParent);
	$(divParent).appendTo('.registration-form');
}

function addPasswordInput() {
    var divParent = newElement('div'),
		span = newElement('span'),
        italic = newElement('i'),
		remove = newElement('span'),
        italicRemove = newElement('i'),
		input = newElement('input');

	var count = childCount(element('reg-form')) + 1,
        name = 'input' + count;

    if (confirm('Do you want to name the input?')) {
        var newName = prompt('Enter input name');
        if (newName.length) {
            name = newName;
        }
    }

    /*

        <div class="input-group" >
            <span class="input-group-label"><i class="fi-pencil"></i></span>
            <input class="input-group-field" type="text" placeholder="Name">
        </div>
    */

	addAttribute('class', 'input-group', divParent);
	addAttribute('class', 'input-group-label', span);
    addAttribute('class', 'fi-lock', italic);

    addAttribute('class', 'input-group-field', input);
	addAttribute('placeholder', cfc(name), input);
    addAttribute('type', 'password', input);
    addAttribute('id', name, input);

	addAttribute('class', 'input-group-label', remove);
    addAttribute('class', 'fi-x', italicRemove);

	addAttribute('name', name, input);

	addHandler(remove, 'click', function() {
		element('reg-form').removeChild(divParent);
	});

    $(italic).appendTo(span);
    $(italicRemove).appendTo(remove);
    $(span).appendTo(divParent);
    $(input).appendTo(divParent);
    $(remove).appendTo(divParent);
	$(divParent).appendTo('.registration-form');
}

function addEmailInput() {
	var divParent = newElement('div'),
		span = newElement('span'),
        italic = newElement('i'),
		remove = newElement('span'),
        italicRemove = newElement('i'),
		input = newElement('input');

	var count = childCount(element('reg-form')) + 1,
        name = 'input' + count;

    if (confirm('Do you want to name the input?')) {
        var newName = prompt('Enter input name');
        if (newName.length) {
            name = newName;
        }
    }

    /*

        <div class="input-group" >
            <span class="input-group-label"><i class="fi-pencil"></i></span>
            <input class="input-group-field" type="text" placeholder="Name">
        </div>
    */

	addAttribute('class', 'input-group', divParent);
	addAttribute('class', 'input-group-label', span);
    addAttribute('class', 'fi-mail', italic);

    addAttribute('class', 'input-group-field', input);
	addAttribute('placeholder', cfc(name), input);
    addAttribute('type', 'email', input);
    addAttribute('id', name, input);

	addAttribute('class', 'input-group-label', remove);
    addAttribute('class', 'fi-x', italicRemove);

	addAttribute('name', name, input);

	addHandler(remove, 'click', function() {
		element('reg-form').removeChild(divParent);
	});

    $(italic).appendTo(span);
    $(italicRemove).appendTo(remove);
    $(span).appendTo(divParent);
    $(input).appendTo(divParent);
    $(remove).appendTo(divParent);
	$(divParent).appendTo('.registration-form');
}

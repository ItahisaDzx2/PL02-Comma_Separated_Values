var assert = chai.assert;

suite('Pruebas Unitarias para el Analizador CSV', function() {
	test('Formato Correcto', function() {
		original.value = 'name,surname\nMarty,McFly';
		calculate();
		assert.deepEqual(finaltable.innerHTML, '<p>\n</p><table class="center" id="result">\n<tbody><tr>                    <td>name</td>                                  <td>surname</td>              </tr>\n<tr>                    <td>Marty</td>                                  <td>McFly</td>              </tr>\n</tbody></table>');
	});
	test('LocalStorage', function() {
		assert.deepEqual(localStorage.original, 'name,surname\nMarty,McFly');
	});
	test('Formato Incorrecto', function() {
		original.value = 'name,surname,address\nMarty,McFly';
		calculate();
		assert.match(finaltable.innerHTML, /error/);
	});
});
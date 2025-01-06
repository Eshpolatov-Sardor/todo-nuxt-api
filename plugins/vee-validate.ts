import { defineRule } from 'vee-validate';
import { required, username, first_name, last_name, min, } from '@vee-validate/rules';

defineRule('required', required);
defineRule('username tuliq emas', username);
defineRule('first name tuliq emas', first_name);
defineRule('last name tuliq emas', last_name);
defineRule('password tuliq emas oltita bulshi kerak', min);

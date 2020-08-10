import * as user from './user';
import * as account from './account';
import * as category from './category';
import * as operation from './operation';

export default {
    ...user,
    ...account,
    ...category,
    ...operation,
};

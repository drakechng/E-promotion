// Import modules used by both client and server through a single index entry point
// e.g. useraccounts configuration file.
/**
 * We need to register the material ui fields
 */
// import 'simple-react-form-material-ui' No need to do this from v1.5

import SimpleSchema from 'simpl-schema';
import {Match} from 'meteor/check'

/**
 * This allows you to define simple-react-form options in the schemas
 */
SimpleSchema.extendOptions({
    srf: Match.Optional(Object)
})
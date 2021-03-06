/**
 * @module form
 */
modules.define('form',
    function(provide, Form) {

/**
 * Field block
 */
Form.decl({ block : this.name, modName : 'has-validate', modVal : true }, /** @lends form.prototype */{

        onSetMod : {
            'js' : {
                'inited' : function() {
                    this.fields = this.getFields();

                    this.bindTo('submit', function(e) {
                        this._onSubmit(e);
                    });
                }
            }
        },

        /**
         * onSubmit event handler
         *
         * @private
         * @param {Event}
         */
        _onSubmit : function(e) {
            this.validate() && e.preventDefault();
        },

        /**
         * Get all invalid form-fields
         *
         * @public
         * @returns {Array}
         */
        getInvalidFields : function() {
            var invalid = [];

            for(var i = 0, l = this.fields.length; i < l; i++) {
                var f = this.fields[i];

                f.getStatus() || invalid.push(f);
            }

            return invalid;
        },

        /**
         * Get form status
         *
         * @public
         * @returns {String}
         */
        getStatus : function() {
            for(var i = 0, l = this.fields.length; i < l; i++) {
                if(!this.fields[i].getStatus()) return false;
            }

            return true;
        },

        /**
         * Check form validaty state
         *
         * @public
         * @returns {Boolean}
         */
        validate : function() {
            for(var i = 0, l = this.fields.length; i < l; i++) {
                this.fields[i].validate();
            }

            this._updateView();
        },

        /**
         * Update form modifier `invalid` according to current validity state.
         * This method can be overriden in projects based on `bem-forms`
         *
         * @protected
         */
        _updateView : function() {
            this.toggleMod('invalid', true, Boolean(this.getStatus()));
        }
    },
    {
        live : false
    });

provide(Form);

});

'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ConditionalField = function () {
  function ConditionalField(args) {
    _classCallCheck(this, ConditionalField);

    this.$controls = $(args.control);

    if (this.$controls.length <= 0) return;

    this.args = args;
    this.args.parent = this.args.parent || false;

    this.setAllVisible();

    this.onChangeBound = this.onChange.bind(this);
    this.$controls.on('change', this.onChangeBound);
  }

  _createClass(ConditionalField, [{
    key: 'onChange',
    value: function onChange(e) {
      var $control = $(e.target);
      this.setVisible($control);
    }
  }, {
    key: 'setVisible',
    value: function setVisible($control) {
      var value = this.inputValue($control);
      console.log($control);
      console.log(value);
      for (var controlValue in this.args.visibility) {
        var $element = this.args.parent ? $control.closest(this.args.parent).find(this.args.visibility[controlValue]) : $(this.args.visibility[controlValue]);

        if (value.toString() === controlValue.toString()) {
          $element.show();
        } else {
          $element.hide();
        }
      }
    }
  }, {
    key: 'setAllVisible',
    value: function setAllVisible() {
      var _this = this;

      this.$controls.each(function (index, control) {
        _this.setVisible($(control));
      });
    }
  }, {
    key: 'inputValue',
    value: function inputValue($control) {
      var inputType = ConditionalField.getInputType($control),
          value = '';
      switch (inputType) {
        case 'checkbox':
          value = $control.is(':checked') ? 'on' : 'off';
          break;
        case 'radio':
          value = this.$controls.filter(':checked').val();
          break;
        default:
          value = $control.val();
      }
      return value;
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      this.$controls.off('change', this.onChangeBound);
    }
  }], [{
    key: 'getInputType',
    value: function getInputType($control) {
      if ($control.is('select')) {
        return 'select';
      } else if ($control.is(':radio')) {
        return 'radio';
      } else if ($control.is(':checkbox')) {
        return 'checkbox';
      }
    }
  }]);

  return ConditionalField;
}();
//# sourceMappingURL=conditional-field.js.map

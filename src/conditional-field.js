class ConditionalField {
  constructor(args){
    this.$controls = $(args.control);

    if(this.$controls.length <= 0) return;

    this.args = args;
    this.args.parent = this.args.parent || false;

    this.setAllVisible();

    this.onChangeBound = this.onChange.bind(this);
    this.$controls.on('change', this.onChangeBound);
  }

  onChange(e) {
    let $control = $(e.target);
    this.setVisible($control);
  }

  setVisible($control) {
    const value = this.inputValue($control);
	  console.log($control);
	  console.log(value);
    for(let controlValue in this.args.visibility){
      const $element =
        this.args.parent ?
        $control.closest( this.args.parent ).find( this.args.visibility[ controlValue ] ) :
        $( this.args.visibility[ controlValue ] );

      if(value.toString() === controlValue.toString()){
          $element.show();
      }else{
          $element.hide();
      }
    }
  }

  setAllVisible() {
    this.$controls.each( ( index, control ) => {
      this.setVisible($(control));
    });
  }

  static getInputType($control) {
    if($control.is('select')){
      return 'select';
    }else if($control.is(':radio')){
      return 'radio';
    }else if($control.is(':checkbox')){
      return 'checkbox';
    }
  }

  inputValue($control) {
    let inputType = ConditionalField.getInputType($control),
        value = '';
    switch(inputType){
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

  destroy() {
    this.$controls.off('change', this.onChangeBound);
  }
}
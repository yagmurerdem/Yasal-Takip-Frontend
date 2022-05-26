
import React from "react";
import FormValidator from "./FormValidator";
import axios from "axios";

class BorcDetayEkleComponent extends React.Component{
constructor(){
super();
this.validator = new FormValidator([{
field: 'tutar',
method: 'isEmpty',
validWhen: false,
message: 'tutarı giriniz.'
},
{
field: 'odemetarihi',
method: 'isEmpty',
validWhen: false,
message: 'ödeme tarihi giriniz.'
},
 {
field: 'sonodeme',
method: 'isEmpty',
validWhen: false,
message: 'son ödeme tarihi giriniz'
},
 
]);
this.state = {
tutar: '',
odemetarihi: '',
sonodeme: '',
validation: this.validator.valid(),
}
this.submitted = false;
}
handleInputChange = event => {
    const{name , value} = event.target;
    this.setState({
        [name]: value
});
}
handleFormSubmit = event => {
event.preventDefault();
const validation = this.validator.validate(this.state);
this.setState({
validation
});
this.submitted = true;
if(validation.isValid) {
//reaches here if form validates successfully...
const {tutar,odemetarihi,sonodeme} = this.state;
  const body= {
   tutar,
   odemetarihi,
   sonodeme
  };
  axios.post('/borcdetay', body)
}
}
render() {
let validation = this.submitted ?this.validator.validate(this.state) : this.state.validation
return (
<div className="container">
<div className="row">
<div className="col-md-4 col-md-offset-4">
<form className="registrationForm">
<h2>Borç Detay Kayıt Formu</h2>
<div className={validation.tutar && 'has-error'}>
<label htmlFor="tutar">Tutar</label>
<input type="string" className="form-control" name="tutar" placeholder="tutar" onChange={this.handleInputChange} /> <span className="help-block">{validation.tutar.message}</span> </div>
<div className={validation.odemetarihi && 'has-error'}>
<label htmlFor="odemetarihi">Ödeme Tarihi</label>
<input type="Date" className="form-control" name="odemetarihi" placeholder="ödeme tarihi" onChange={this.handleInputChange} /> <span className="help-block">{validation.odemetarihi.message}</span> </div>
<div className={validation.sonodeme && 'has-error'}>
<label htmlFor="sonodeme">Son Ödeme Tarihi</label>
<input type="Date" className="form-control" name="sonodeme" placeholder="son ödeme tarihi" onChange={this.handleInputChange} /> <span className="help-block">{validation.sonodeme.message}</span> </div>
<button onClick={this.handleFormSubmit} className="btn btn-primary"> Kayıt </button>
</form>
</div>
</div>
</div>
)
}
}
export default BorcDetayEkleComponent;

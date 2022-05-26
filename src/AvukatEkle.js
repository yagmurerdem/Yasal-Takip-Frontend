import React from "react";
import FormValidator from "./FormValidator";
import axios from "axios";
import { Redirect } from 'react-router-dom';
import { Route , withRouter} from 'react-router-dom';

class AvukatEkle extends React.Component{

constructor(props){

super(props);
this.handleFormSubmit = this.handleFormSubmit.bind(this)

this.validator = new FormValidator([{
field: 'adi',
method: 'isEmpty',
validWhen: false,
message: 'isminizi giriniz.'
}, {
field: 'soyadi',
method: 'isEmpty',
validWhen: false,
message: 'soyadınızı giriniz.'
}, {
field: 'baroBilgisi',
method: 'isEmpty',
validWhen: false,
message: 'onaylı baro bilginizi giriniz'
}, 
 {
field: 'sicilNo',
method: 'isEmpty',
validWhen: false,
message: 'sicil numaranızı giriniz.'

}
]);
this.state = {
adi: '',
soyadi: '',
baroBilgisi: '',
sicilNo: '',
posting:false,
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
const {adi,soyadi,baroBilgisi,sicilNo} = this.state;

  const body= {
   adi,
   soyadi,
   baroBilgisi,
   sicilNo


  };


  axios.post('/ekle', body)
  .then(res => {
    if(res.status===200)
    this.setState({posting:true});
  })
  .catch(function (error) {
    if (error.response) {
      alert(error.response.data.message);
    
    }
 
  });


}





}
render() {
let validation = this.submitted ?this.validator.validate(this.state) : this.state.validation
if(this.state.posting){
  return <Redirect to = {{pathname:"/avukat"}} />;
}
return (

<div className="container">
<div className="row">
<div className="col-md-4 col-md-offset-4">
<form className="registrationForm">
<h2>Avukat Ekle</h2>
<div className={validation.baroBilgisi && 'has-error'}>
<label htmlFor="adi">Ad</label>
<input type="string" className="form-control" name="adi" placeholder="ad" onChange={this.handleInputChange} /> <span className="help-block">{validation.adi.message}</span> </div>
<div className={validation.soyadi && 'has-error'}>
<label htmlFor="soyadi">Soyad</label>
<input type="soyadi" className="form-control" name="soyadi" placeholder="soyadi" onChange={this.handleInputChange} /> <span className="help-block">{validation.soyadi.message}</span> </div>
<div className={validation.baroBilgisi && 'has-error'}>
<label htmlFor="baroBilgisi">baroBilgisi</label>
<input type="string" className="form-control" name="baroBilgisi" placeholder="Baro Bilgisi" onChange={this.handleInputChange} /> <span className="help-block">{validation.baroBilgisi.message}</span> </div>
<div className={validation.sicilNo && 'has-error'}>
<label htmlFor="sicilNo">sicilNo</label>
<input type="integer" className="form-control" placeholder="sicilNo" name="sicilNo" onChange={this.handleInputChange} /> <span className="help-block">{validation.sicilNo.message}</span> </div>

<button onClick={this.handleFormSubmit} className="btn btn-primary"> Ekle </button>

</form>
</div>
</div>
</div>
)
}
}
export default withRouter(AvukatEkle);
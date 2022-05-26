import React from 'react'
import { Button } from '@material-ui/core';
import { Route , withRouter} from 'react-router-dom';
import axios from "axios";
import AvukatEkle from './AvukatEkle';
import { Redirect } from 'react-router-dom';
class AvukatComponent extends React.Component {


    constructor(props) {
        super(props)
       
        this.state = {
            avukatEntities: [],
            isLoaded: false,
            deleting:false
        };
 this.handleSubmit = this.handleSubmit.bind(this)
 this.deleteRow = this.deleteRow.bind(this);
    }


    componentDidMount() {

        fetch('/avukat').then((res) => res.json())
            .then((json) => {
                this.setState({

                    avukatEntities: json,
                    isLoaded: true,
                });
            })
          


    }
    handleSubmit(e){
       e.preventDefault();
      this.props.history.push("/avukatekle")

    
    }
    
    handleDelete = (sicilNo) => {
        // Whatever you want to do with that item
        axios.delete("/delete", { params: { id: sicilNo } }).then(response => {
          console.log(response);
        });

    }
    deleteRow(sicilNo, e){
        axios.delete(`/delete/${sicilNo}`)
        .then(res => {
            if(res.status===200)
            this.setState({deleting:true});
       
          })
      
            const avukatEntities = this.state.avukatEntities.filter(item => item.sicilNo !== sicilNo);
            this.setState({ avukatEntities });
          
      
      }
    

    render() {
        var { isLoaded, avukatEntities } = this.state;
        if (!isLoaded) {
            return <div>Loading..</div>
        }
        if(this.state.deleting){
            return <Redirect to = {{pathname:"/avukat"}} />;
          }
          
        else {
            return (
            
                <div>
                   
                    <h2 className="text-center">AVUKATLAR</h2>
                    <table className="table table-striped">

                        <thead>
                            <tr>
                                <th>Avukat Ad</th>
                                <th>Avukat Soyad</th>
                                <th>Avukat Baro Bilgisi</th>
                                <th>Avukat Sicil No</th>
                            </tr>
                        </thead>
                        <tbody>
                            {

                                avukatEntities.map(avukat =>
                                    <tr key={avukat.id}>
                                        <td>{avukat.adi}</td>
                                        <td>{avukat.soyadi}</td>
                                        <td>{avukat.baroBilgisi}</td>
                                        <td>{avukat.sicilNo}</td>
                                      <button type="submit" onClick={(e)=> this.deleteRow(avukat.sicilNo,e)}>
              Delete
            </button>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                    <div>
                   
                   <Button onClick={this.handleSubmit} className="btn btn-primary" variant="contained" color="primary" fullWidth> Avukat Ekle </Button> 
                    
                   </div>
                </div>
            );
        }
    }
}
export default withRouter(AvukatComponent)

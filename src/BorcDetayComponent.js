import React from 'react'


export default class BorcDetayComponent extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            borcdetayEntities: [],
            isLoaded: false
        };

    }



    componentDidMount() {

        fetch('/borcdetay').then((res) => res.json())
            .then((json) => {
                this.setState({

                    borcdetayEntities: json,
                    isLoaded: true,
                });
            })

    }
    render() {

        var { isLoaded, borcdetayEntities } = this.state;
        if (!isLoaded) {
            return <div>Loading..</div>
        }
        else {
            return (
                <div>
                    <h2 className="text-center">BORÇ DETAYLARI</h2>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Ödeme Tarihi</th>
                                <th>Son Ödeme Tarihi</th>
                                <th>Tutar</th>

                            </tr>
                        </thead>
                        <tbody>
                            {

                                borcdetayEntities.map(borcdetay =>
                                    <tr key={borcdetay.borcDetayId}>
                                        <td>{borcdetay.odemeTarihi}</td>
                                        <td>{borcdetay.sonOdeme}</td>
                                        <td>{borcdetay.tutar}</td>

                                    </tr>
                                )
                            }
                        </tbody>
                    </table>


        
                </div>
            );
        }

    }
}


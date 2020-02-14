import React, { Component } from 'react';

class Footer extends Component {
    render() {
        return (
            <div className="container-fluid">
                <footer className="pt-4 my-md-5 pt-md-5 border-top">
                    <div className="row">
                        <div className="col-12 col-md">
                            <img className="mb-2" src={require('./imgs/Logo.png')} width="24" />
                            <small className="d-block mb-3 text-muted">&copy; 2020 PAKU</small>
                        </div>
                        <div className="col-6 col-md">
                            <h5><div>Paku</div></h5>
                            <ul className="list-unstyled text-small">
                                <li><a className="text-muted" href="#">ข่าวสาร</a></li>
                                <li><a className="text-muted" href="#">นโยบาย</a></li>
                                <li><a className="text-muted" href="#">ความหลากหลายและการเป็นส่วนหนึ่ง</a></li>
                                <li><a className="text-muted" href="#">ความสะดวกในการเข้าถึง</a></li>
                            </ul>
                        </div>
                        <div className="col-6 col-md">
                            <h5><div>ศูนย์ความช่วยเหลือ</div></h5>
                            <ul className="list-unstyled text-small">
                                <li><a className="text-muted" href="#">การจองที่จอดรถ</a></li>
                                <li><a className="text-muted" href="#">การให้เช่าที่จอดรถ</a></li>
                                <li><a className="text-muted" href="#">Another resource</a></li>
                                <li><a className="text-muted" href="#">Final resource</a></li>
                            </ul>
                        </div>
                        <div className="col-6 col-md">
                            <h5><div>About</div></h5>
                            <ul className="list-unstyled text-small">
                                <li><a className="text-muted" href="https://www.facebook.com/GarfieldKp311">Facebook</a></li>
                                <li><a className="text-muted" href="#">Google+</a></li>
                                <li><a className="text-muted" href="#">Twitter</a></li>
                            </ul>
                        </div>
                    </div>
                </footer>
            </div>
        );
    }
}

export default Footer;
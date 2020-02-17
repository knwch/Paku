import React, { Component } from 'react';

class PostDetailCard extends Component {

    render() {
        return (
                <div className="Card">
                    <div className="card mb-4 border-0">
                        <div className="card-body text-left p-0 pt-2">

                            <div className="row">
                                <div className="col-md-9">
                                    <h2 className="card-text font-weight-bold">Name</h2>
                                    <small className="card-text">Address</small><br />
                                    <small className="card-text">Telephone</small>
                                    <small className="card-text">ติดต่อเจ้าของที่จอดรถ</small>
                                </div>
                                <div className="col-md-3">
                                    <img className="mb-2" src={require('../../components/imgs/Logo.png')} width="50" />
                                </div>
                            </div>

                            <div className="border-top">
                                <text className="card-text">ประเภทที่จอดรถ:</text><br />
                                <text className="card-text">จำนวนที่จอดรถ:</text><br />
                                <text className="card-text">ประเภทรถที่สามารถจิดได้:</text><br />
                                <text className="card-text">ช่วงเวลาที่ให้บริการ:</text>
                            </div>

                            <div className="border-top">
                                <text className="card-text font-weight-bold">คำอธิบายเกี่ยวกับที่จอดรถ</text><br />
                                <text className="card-text">คำอธิบายเกี่ยวกับที่จอดรถ</text><br />

                                <text className="card-text font-weight-bold">กฎที่จอดรถ</text><br />
                                <text className="card-text">กฎที่จอดรถ</text><br />

                                <text className="card-text font-weight-bold">สถานที่ใกล้เคียงกับที่จอดรถ</text><br />
                                <text className="card-text">สถานที่ใกล้เคียงกับที่จอดรถ</text><br />
                            </div>

                            <div className="border-top">
                                <text className="card-text font-weight-bold">สิ่งอำนวยความสะดวก</text><br />
                                <text className="card-text">CCTV</text><br />
                                <text className="card-text">รั้ว</text><br />
                            </div>

                            <div className="border-top">
                                <text className="card-text font-weight-bold">สถานะว่าง</text><br />
                            </div>


                            <div className="border-top">
                                <text className="card-text font-weight-bold">รีวิว</text><br />
                            </div>
                        </div>
                    </div>
                </div>
        );
    }
    
}

export default PostDetailCard;
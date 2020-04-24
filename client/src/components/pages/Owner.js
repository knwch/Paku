import React, { Component } from "react";
import { Link } from "react-router-dom";
import NavMenu from "../NavMenu";
import Footer from "../Footer";
import {
  List,
  Label,
  Icon,
  Grid,
  Image,
  Header,
  Button,
} from "semantic-ui-react";

class Owner extends Component {
  componentDidMount() {
    document.title = "Paku - Owner";
  }

  render() {
    return (
      <div className="container-fluid">
        <NavMenu />
        <div className="mb-5">
          <Grid centered>
            <Grid.Row>
              <Header textAlign="center" as="h3" className="mb-3">
                <Header.Content as="h3">
                  <div>วิธีเริ่มให้เช่าที่จอดรถ</div>
                  <Header.Subheader className="pt-2">
                    <div>การลงประกาศที่จอดรถบน PAKU ไม่ใช่เรื่องยาก...</div>
                  </Header.Subheader>
                </Header.Content>
              </Header>
            </Grid.Row>

            <Grid.Row columns={2} centered>
              <Grid.Column mobile={8} tablet={6} computer={6} textAlign="right">
                <Image
                  spaced="right"
                  size="medium"
                  className="mb-2"
                  src={require("../imgs/phone.png")}
                />
              </Grid.Column>
              <Grid.Column mobile={8} tablet={6} computer={6} textAlign="left">
                <List className="mt-5" animated verticalAlign="middle">
                  <List.Item>
                    <List.Icon>
                      <Label circular className="btn-paku-light">
                        1
                      </Label>
                    </List.Icon>
                    <List.Content>
                      <List.Header>
                        <div>เพิ่ม Location ที่คุณต้องการจะให้เช่า</div>
                      </List.Header>
                    </List.Content>
                  </List.Item>

                  <List.Icon>
                    <Label className="border-0 " basic circular>
                      <Icon
                        name="long arrow alternate down"
                        color="grey"
                        fitted
                      />
                    </Label>
                  </List.Icon>

                  <List.Item>
                    <List.Icon>
                      <Label circular className="btn-paku-light">
                        2
                      </Label>
                    </List.Icon>
                    <List.Content>
                      <List.Header>
                        <div>
                          ส่รายละเอียดของที่พื้นที่ที่ต้องการเปิดให้เช่า
                        </div>
                      </List.Header>
                    </List.Content>
                  </List.Item>

                  <List.Icon>
                    <Label className="border-0 " basic circular>
                      <Icon
                        name="long arrow alternate down"
                        color="grey"
                        fitted
                      />
                    </Label>
                  </List.Icon>

                  <List.Item>
                    <List.Icon>
                      <Label circular className="btn-paku-light">
                        3
                      </Label>
                    </List.Icon>
                    <List.Content>
                      <List.Header>
                        <div>ตั้งราคา</div>
                      </List.Header>
                    </List.Content>
                  </List.Item>

                  <List.Icon>
                    <Label className="border-0 " basic circular>
                      <Icon
                        name="long arrow alternate down"
                        color="grey"
                        fitted
                      />
                    </Label>
                  </List.Icon>

                  <List.Item>
                    <List.Icon>
                      <Label circular className="btn-paku-light">
                        4
                      </Label>
                    </List.Icon>
                    <List.Content>
                      <List.Header>
                        <div>ตรวจสอบรายละเอียด แล้วกดยืนยัน</div>
                      </List.Header>
                    </List.Content>
                  </List.Item>
                </List>

                <Button href="/login" className="btn-paku mt-2" animated>
                  <Button.Content visible>เริ่มต้น</Button.Content>
                  <Button.Content hidden>
                    <Icon name="arrow right" />
                  </Button.Content>
                </Button>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </div>
        <Footer />
      </div>
    );
  }
}

export default Owner;

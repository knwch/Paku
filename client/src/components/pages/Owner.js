import React, { Component } from "react";
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

            <Grid.Row columns={2} only="computer tablet" centered>
              <Grid.Column mobile={8} tablet={6} computer={6} textAlign="right">
                <Image
                  spaced="right"
                  size="medium"
                  className="mb-2"
                  src={require("../imgs/newpost.png")}
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
                        <div>เพิ่มตำแหน่งที่ตั้ง ที่คุณต้องการจะให้เช่า</div>
                      </List.Header>
                      <List.Description className="pt-1">
                        <div>ระบุสถานที่ตั้งของที่จอดรถของคุณ</div>
                      </List.Description>
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
                          ใส่รายละเอียดของสิ่งอำนวยความสะดวก
                          และรายละเอียดเกี่ยวกับที่ตั้ง
                        </div>
                      </List.Header>
                      <List.Description className="pt-1">
                        <div>
                          เพื่อช่วยให้ผู้ที่ต้องการมาเช่าใช้บริการของคุณ
                          และหากคุณต้องการแก้ไข คุณสามารถกลับมาแก้ไขใหม่ได้
                        </div>
                      </List.Description>
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
                        <div>ตั้งราคาที่คุณพอใจ</div>
                      </List.Header>
                      <List.Description className="pt-1">
                        <div>
                          เราไม่มีนโยบายกำหนดราคาค่าเช่าขั้นต่ำ
                          คุณสามารถตั้งราคาค่าเช่าตามทีคุณเห็นสมควรตรวจสอบ
                        </div>
                      </List.Description>
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

            <Grid.Row columns={1} only="mobile" centered>
              <Grid.Column mobile={14} textAlign="left">
                <List className="mt-1" animated verticalAlign="middle">
                  <List.Item>
                    <List.Icon>
                      <Label circular className="btn-paku-light">
                        1
                      </Label>
                    </List.Icon>
                    <List.Content>
                      <List.Header>
                        <div>เพิ่มตำแหน่งที่ตั้ง ที่คุณต้องการจะให้เช่า</div>
                      </List.Header>
                      <List.Description className="pt-1">
                        <div>ระบุสถานที่ตั้งของที่จอดรถของคุณ</div>
                      </List.Description>
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
                          ใส่รายละเอียดของสิ่งอำนวยความสะดวก
                          และรายละเอียดเกี่ยวกับที่ตั้ง
                        </div>
                      </List.Header>
                      <List.Description className="pt-1">
                        <div>
                          เพื่อช่วยให้ผู้ที่ต้องการมาเช่าใช้บริการของคุณ
                          และหากคุณต้องการแก้ไข คุณสามารถกลับมาแก้ไขใหม่ได้
                        </div>
                      </List.Description>
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
                        <div>ตั้งราคาที่คุณพอใจ</div>
                      </List.Header>
                      <List.Description className="pt-1">
                        <div>
                          เราไม่มีนโยบายกำหนดราคาค่าเช่าขั้นต่ำ
                          คุณสามารถตั้งราคาค่าเช่าตามทีคุณเห็นสมควรตรวจสอบ
                        </div>
                      </List.Description>
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

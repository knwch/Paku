import React, { Component } from "react";
import { Grid, Responsive, Container, Button, Card } from "semantic-ui-react";
import NavMenu from "../../NavMenu";
import Footer from "../../Footer";

class PostConfirm extends Component {
  render() {
    const { values } = this.props;

    if (values.isPostSuccess === true) {
      return (
        <Responsive>
          <NavMenu />
          <Container fluid>
            <Grid centered className="mb-4">
              <Grid.Column
                className="text-left pr-auto"
                mobile={16}
                tablet={8}
                computer={8}
              >
                <Card className="margin-bottom" link fluid>
                  <Card.Content>
                    <Card.Header textAlign="center">
                      <div>ลงประกาศสำเร็จ</div>
                    </Card.Header>
                  </Card.Content>
                  <Card.Content>
                    <Button href="/" compact basic>
                      <Button.Content visible>กลับสู่หน้าหลัก</Button.Content>
                    </Button>
                    <Button href="/mypost" compact basic>
                      <Button.Content visible>
                        ไปยังหน้ารายการของคุณ
                      </Button.Content>
                    </Button>
                  </Card.Content>
                </Card>
              </Grid.Column>
            </Grid>
          </Container>
          <Footer />
        </Responsive>
      );
    } else {
      return (
        <Responsive>
          <NavMenu />
          <Container fluid>
            <Grid centered className="mb-4">
              <Grid.Column
                className="text-left pr-auto"
                mobile={16}
                tablet={8}
                computer={8}
              >
                <Card className="margin-bottom" link fluid>
                  <Card.Content>
                    <Card.Header textAlign="center">
                      <div>เกิดบางอย่างผิดพลาด</div>
                    </Card.Header>
                  </Card.Content>
                  <Card.Content>
                    <Button href="/" compact basic>
                      <Button.Content visible>กลับสู่หน้าหลัก</Button.Content>
                    </Button>
                    {/* <Button href="/post" compact basic>
                      <Button.Content visible>ลองอีกครั้ง</Button.Content>
                    </Button> */}
                  </Card.Content>
                </Card>
              </Grid.Column>
            </Grid>
          </Container>
          <Footer />
        </Responsive>
      );
    }
  }
}

export default PostConfirm;

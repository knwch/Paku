import React, { Component } from "react";
import { Image } from "semantic-ui-react";
import { Link } from "react-router-dom";

class Footer extends Component {
  render() {
    return (
      <div className="container-fluid">
        <footer className="pt-4 my-md-5 pt-md-5 border-top">
          <div className="row">
            <div className="col-12 col-md">
              <Image
                className="mb-2"
                src={require("./imgs/Logo.png")}
                width="24"
              />
              <small className="d-block mb-3 text-muted">
                &copy; 2020 PAKU
              </small>
            </div>
            <div className="col-6 col-md">
              <h5>
                <div>Paku</div>
              </h5>
              <ul className="list-unstyled text-small">
                <li>
                  <Link
                    className="text-muted"
                    to={{ pathname: "/support", query: "terms" }}
                  >
                    ข้อกำหนดและเงื่อนไข
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-muted"
                    to={{ pathname: "/support", query: "privacy" }}
                  >
                    ความเป็นส่วนตัว
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-muted"
                    to={{ pathname: "/support", query: "security" }}
                  >
                    ความปลอดภัย
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-muted"
                    to={{ pathname: "/support", query: "finance" }}
                  >
                    การเงิน
                  </Link>
                </li>
              </ul>
            </div>
            <div className="col-6 col-md">
              <h5>
                <div>ศูนย์ความช่วยเหลือ</div>
              </h5>
              <ul className="list-unstyled text-small">
                <li>
                  <Link
                    className="text-muted"
                    to={{ pathname: "/support", query: "faq" }}
                  >
                    คำถามที่พบบ่อย
                  </Link>
                </li>
                <li>
                  <Link className="text-muted" to={{ pathname: "/rent" }}>
                    การจองที่จอดรถ
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-muted"
                    to={{ pathname: "/support", query: "rent" }}
                  >
                    การให้เช่าที่จอดรถ
                  </Link>
                </li>
              </ul>
            </div>
            <div className="col-6 col-md">
              <h5>
                <div>ติดต่อ</div>
              </h5>
              <ul className="list-unstyled text-small">
                <li>
                  <a
                    className="text-muted"
                    href="mailto:official.pakuforpark@gmail.com"
                  >
                    official.pakuforpark@gmail.com
                  </a>
                </li>
                {/* <li>
                  <text className="text-muted" href="#">
                    Google+
                  </text>
                </li>
                <li>
                  <text className="text-muted" href="#">
                    Twitter
                  </text>
                </li> */}
              </ul>
            </div>
          </div>
        </footer>
      </div>
    );
  }
}

export default Footer;

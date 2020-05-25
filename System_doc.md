# **Requirements document**
## หน้าที่และความรับผิดชอบ

|                        |                                      |
| ---------------------- | ------------------------------------ |
| นายกรวิชญ์ โคศรีเพชร      | `Developer` / Project Manager        |
| นางสาวภัณฑิรา เลาหวิรุฬห์กุล | `Project Manager` / Documentation​   |
| นางสาวรัตนวลี ทับเนียม     | `Tester` / Program Management​       |
| นายวุฒินันท์ แย้มบู่          | `Documentation` / Tester​            |
| นายสาฑิต จันทร์ทอง        | `Developer` / Tester                 |
| นางสาวสโรชา สังข์บุญลือ    | `Program Management` / Documentation |

## **เป้าหมายของทีม**
1. เป็นส่วนหนึ่งในการแก้ปัญหาเรื่องที่จอดรถ
2. ทำให้ผู้ใช้รู้สึกสะดวกสบาย และหมดปัญหาเรื่องที่จอดรถ เมื่อใช้ PAKU

## **Pain point**
1. ที่จอดรถมีไม่เพียงพอต่อความต้องการของผู้ใช้
2. ขี้เกียจวนหาที่จอดรถ

## **User stories**
&emsp;จากการที่เราได้ทำการเก็บ requirement ทำให้เรามองเห็นปัญหา และการแก้ปัญหาต่างๆของผู้ใช้ และผู้ใช้แต่ละท่าน ก็มีวิธีการแก้ไขที่ต่างกันออกไป เช่น
- คุณเฟรนด์ ทำงานบริษัทเกี่ยวกับ software house ทำงานใน office ซึ่ง office อยู่ที่บ้าน จึงไม่มีปัญหาเรื่องการจอดรถที่บริษัท แต่เมื่อเวลาที่คุณเฟรนด์ต้องการออกไปทำธุระข้างนอก มักประสบปัญหาเรื่องที่จอดรถเช่นกัน และวิธีการแก้ปัญหาของคุณเฟรนด์คือ นำรถไปล้าง และฝากรถไว้ที่ car care 
- คุณพ่อที่มาส่งลูกเรียนพิเศษที่สยามกิตต์ ทำงานรัฐวิสาหกิจ ที่บ้านอยู่ใกล้ที่ทำงาน และทางที่ทำงานได้มีการเช่าที่จอดรถสำหรับพนักงาน ส่วนเวลาที่คุณพ่อต้องการมาห้าง จะขึ้นรถไฟฟ้าแทน เพราะไม่อยากวนหาที่จอดรถ
- คุณเทียน ที่มักจะมีปัญหาเรื่องการจอดรถห้าง แต่ถ้ามีที่จอดรถใกล้ๆ และราคาสมเหตุสมผล ก็พร้อมที่จะเข้าใช้บริการ
- คุณสุขสันติ มีอาชีพรับจ้างขับรถตู้ ต้องไปสถานที่ต่างๆ บางครั้งมีการรับเหมาขับรถตู้ในกรุงเทพมหานคร และไม่อยากเสียเวลาหาที่จอดรถ ต้องการตัวช่วยในการหาที่จอดรถ เพราะด้วยอาชีพของเขาต้องใช้รถทุกวัน

## **User requirement definition**
1. สามารถค้นหาและจองที่จอดรถ (ล่วงหน้า)ได้
2. ผู้ใช้สามารถไว้วางใจที่จะฝากรถได้
3. ระบบสามารถบอกสิ่งอำนวยความสะดวกต่างๆในพื้นที่เช่า
4. ผู้ใช้สามารถทราบราคาที่จอดรถของแต่ละพื้นที่ได้
5. ระบบสามารถยืนยันตัวตนผู้ให้เช่าพื้นที่จอดรถได้
6. ระบบสามารถลงประกาศพื้นที่จอดรถได้
7. admin สามารถจัดการผู้ใช้ได้ เช่น ลบหรือแบนผู้ใช้ได้
8. admin สามารถยืนยันได้ว่าผู้ที่ลงประกาศที่จอดรถมีตัวตนจริง

## **Function**
### Functional
User (renter)
- sign in / sign up
- log in / log out
- notification
- profile
- search
- comment
- rating
- booking / cancel booking 
- chat
- check in / check out
- recommend
- switch profile
  
User (lessor)
- sign in / sign up
- log in / log out
- notification
- profile
- post / edit / delete 
- ที่จอดรถ 
- comment
- rating
- chat
- upload photos 
- booking / cancel booking
- check in / check out
- recommend ราคา
- switch profile

Admin
- sign in / sign up
- log in / log out
- search post / user
- manage user
- notification

### Non-functional
- 1 บัตรประชาชน ต่อ 1 account เท่านั้น
- สามารถจองที่จอดรถล่วงหน้าได้ 3 วัน
- สามารถให้ rating ได้ 5 ระดับ
- สามารถอัพโหลดภาพได้สูงสุด 5 ภาพ
- สามารถค้นหาที่จอดรถจากชื่อสถานที่ และสถานที่ใกล้เคียง

### ฟังก์ชันการใช้งานทั้งหมดในเว็บไซต์
| Function               | End User |  Admin   |
| ---------------------- | :------: | :------: |
| Register               | &#10003; |          |
| Login / Logout out     | &#10003; | &#10003; |
| Show profile           | &#10003; |          |
| Edit profile           | &#10003; |          |
| Upload profile picture | &#10003; |          |
| Post                   | &#10003; |          |
| Edit                   | &#10003; |          |
| Delete                 | &#10003; |          |
| Upload picture         | &#10003; |          |
| Booking                | &#10003; |          |
| Cancel booking         | &#10003; |          |
| Check in               | &#10003; |          |
| Check out              | &#10003; |          |
| Comment                | &#10003; |          |
| Rating                 | &#10003; |          |
| Search post            | &#10003; |          |
| Delete user            |          | &#10003; |
| Approve user           |          | &#10003; |
| Decline user           |          | &#10003; |

## **Not doing**
1. การสร้างที่จอดรถสามารถเลือกประเภทที่จอดรถได้ มากกว่า 1 ประเภท
2. การจ่ายเงิน ที่มีตัวเลือกมากกว่าการจ่ายด้วยเงินสด
3. การสร้าง chat ที่ทำให้ผู้จองที่รถ และเจ้าของที่จอดรถ สามารถโต้ตอบ หรือสอบถามรายละเอียดผ่านแชทได
4. Recommend ตามพฤติกรรมของ User เช่น ตำแหน่งที่ผู้ใช้อยู่ปัจจุบัน หรือแนะนำจากตำแหน่งที่ผู้ใช้ต้องการจะไป ไม่ใช่เพียงจาก Rating 
5. Notification ที่จะมีการแจ้งเตือนการกดจองของผู้เช่าที่จอดรถ และแจ้งเตือนการยืนยันการเช่าจากเจ้าของที่จอดรถ

# **Software architecture document**
## **Architecture & Design Principles**
### Context model
![context](public/img/context%20model.png) 

### Use case diagram
![usecase](public/img/use%20case.png)

### Class diagram
![class](public/img/class%20diagram.png)


# **Quality assurance documentation**
## Validation, Verification and Testing

#### `Module (filename) : Register`  `Function (method) : Register` 

Test Case #1
- `Objective :`   เพื่อทดสอบว่าการลงทะเบียนจำเป็นต้องกรอกข้อมูลให้ครบทุกตัว
- `Input to test case :`  ไม่ใส่ข้อมูลใด ๆ เลย
- `Test procedure :` ไม่กรอกข้อมูลใด ๆ และกดลงทะเบียน
- `Expected results :` ไม่สามารถลงทะเบียนได้

Test Case #2
- `Objective :` เพื่อทดสอบว่าชื่อจริงและนามสกุลต้องไม่สามารถใส่เป็นตัวเลขได้
- `Input to test case :` ใส่ตัวเลขในช่องชื่อจริงและนามสกุล
- `Test procedure :` ใส่ตัวเลขในช่องชื่อจริงและนามสกุล และกดลงทะเบียน
- `Expected results :` ไม่สามารถลงทะเบียนได้

Test Case #3
- `Objective :` เพื่อทดสอบว่า username จะต้องไม่เป็นอักขระพิเศษ
- `Input to test case :` ใส่อักขระพิเศษในช่อง username
- `Test procedure :` ใส่อักขระพิเศษในช่อง username และกดลงทะเบียน
- `Expected results :` ไม่สามารถลงทะเบียนได้

Test Case #4
- `Objective :` เพื่อทดสอบการกรอกเบอร์โทรศัพท์ จะต้องไม่ใส่ขีด -
- `Input to test case :` ทดสอบการใส่ขีด - ในการกรอกเบอร์โทรศัพท์
- `Test procedur :` ใส่ขีด - ในการกรอกเบอร์โทรศัพท์ และกดลงทะเบียน
- `Expected results :` ไม่สามารถลงทะเบียนได้

Test Case #5
- `Objective :` เพื่อทดสอบการกรอกเบอร์โทรศัพท์ จะต้องกรอกให้ครบ 10 ตัว
- `Input to test case :` ทดสอบใส่เบอร์โทรศัพท์ไม่ครบ 10 ตัว
- `Test procedure :` ใส่เบอร์โทรศัพท์ไม่ครบ 10 ตัว และกดลงทะเบียน
- `Expected results :` ไม่สามารถลงทะเบียนได้

Test Case #6
- `Objective :` เพื่อทดสอบการกรอกเว้นวรรคระหว่างข้อความจะต้องไม่สามารถทำได้
- `Input to test case :` ทดสอบกรอกแบบเว้นวรรคข้อความในทุกช่อง
- `Test procedure :` ทดสอบกรอกแบบเว้นวรรคข้อความในทุกช่อง และกดลงทะเบียน
- `Expected results :` ไม่สามารถลงทะเบียนได้

Test Case #7
- `Objective :` เพื่อทดสอบว่า e-mail จำเป็นจะต้องกรอกให้ถูกต้องตามหลักการ
- `Input to test case :` ทดสอบกรอก e-mail ไม่ถูกต้อง เช่น ไม่ใส่ @ เป็นต้น
- `Test procedure :` ทดสอบกรอก e-mail ไม่ถูกต้อง และกดลงทะเบียน
- `Expected results :` ไม่สามารถลงทะเบียนได้

Test Case #8
- `Objective :` เพื่อทดสอบว่าการกรอก password จำเป็นต้องเหมือนกันทั้ง 2 ช่อง
- `Input to test case :` ทดสอบกรอก password ไม่เหมือนกันทั้ง 2 ช่อง
- `Test procedure :` กรอก password ไม่เหมือนกันทั้ง 2 ช่อง และกดลงทะเบียน
- `Expected results :` ไม่สามารถลงทะเบียนได้

Test Case #9
- `Objective :` เพื่อทดสอบว่าการกรอก username จะต้องมีจำนวนตั้งแต่ 6 - 30 ตัว
- `Input to test case :` ทดสอบกรอก username เกินหรือขาดตามจำนวนที่กำหนด
- `Test procedure :` ทดสอบกรอก username เกินหรือขาด และกดลงทะเบียน
- `Expected results :` ไม่สามารถลงทะเบียนได้

Test Case #10
- `Objective :` เพื่อทดสอบว่าจะต้องกดยอมรับเงื่อนไขก่อนลงทะเบียน
- `Input to test case :` ทดสอบไม่กดยอมรับเงื่อนไขก่อนลงทะเบียน
- `Test procedure :` ทดสอบไม่กดยอมรับเงื่อนไข และกดลงทะเบียน
- `Expected results :` ไม่สามารถลงทะเบียนได้
---
#### `Module (filename) : Login` `Function (method) : Login`

Test Case #1
- `Objective :` เพื่อทดสอบการใส่ข้อมูลในช่อง username
- `Input to test case :` ใส่ได้ทั้ง username และ email
- `Test procedure :` กดปุ่ม Login
- `Expected results :` สามารถ login ได้สามารถ login ได้

Test Case #2
- `Objective :` เพื่อทดสอบการใส่ข้อมูลในช่อง username
- `Input to test case :` ไม่ใส่อะไรเลย
- `Test procedure :` กดปุ่ม Login
- `Expected results :` ไม่สามารถ login ได้

Test Case #3
- `Objective :` เพื่อทดสอบการใส่ข้อมูลในช่อง password
- `Input to test case :` ใส่รหัสผ่านไม่ถูกต้อง
- `Test procedure :` กดปุ่ม Login
- `Expected results :` ไม่สามารถ login ได้

Test Case #4
- `Objective :` เพื่อทดสอบการใส่ข้อมูลในช่อง password
- `Input to test case :` ใส่รหัสผ่านถูกต้อง
- `Test procedur :` กดปุ่ม Login
- `Expected results :` สามารถ login ได้

Test Case #5
- `Objective :` เพื่อทดสอบการใส่ข้อมูลในช่อง password
- `Input to test case :` ไม่ใส่อะไรเลย
- `Test procedure :` กดปุ่ม Login
- `Expected results :` ไม่สามารถ login ได้

Test Case #6
- `Objective :` เพื่อทดสอบการจดจำ username และ password
- `Input to test case :` กด check point หน้าคำว่า remember me
- `Test procedure :` หลังจาก logout แล้ว login เข้ามาใหม่
- `Expected results :` 

Test Case #7
- `Objective :` เพื่อทดสอบการ logout อัตโนมัติ หลังเลยเวลาที่กำหนด
- `Input to test case :` login เข้าสู่ระบบ
- `Test procedure :` login ทิ้งไว้ 1 ชั่วโมง แล้วรีเฟรชหน้าใหม่
- `Expected results :` log out อัตโนมัติ
---

#### `Module (filename) : Profile` `Function (method) : Profile` 

Test Case #1
- `Objective :` เพื่อทดสอบว่าสามารถแสดง Profile ได้ครบถ้วน
- `Input to test case :` กดดู Profile
- `Test procedure :` กดเข้าดู Profile
- `Expected results :` สามารถกดเข้าดู Profile ได้

Test Case #2
- `Objective :` เพื่อทดสอบว่าสามารถแก้ไขข้อมูลใน Profile ได้
- `Input to test case :` ทดสอบแก้ไขข้อมูลใน Profile
- `Test procedure :` ทดสอบแก้ไขข้อมูลใน Profile
- `Expected results :` สามารถแก้ไขข้อมูลใน Profile ได้

Test Case #3
- `Objective :` เพื่อทดสอบว่าสามารถอัปโหลดหรือแก้ไขรูป Profile ได้
- `Input to test case :` ทดสอบว่าสามารถอัปโหลดหรือแก้ไขรูป Profile ได้
- `Test procedure :` ทดสอบสามารถอัปโหลดหรือแก้ไขรูป Profile ได้
- `Expected results :` สามารถอัปโหลดหรือแก้ไขรูป Profile ได้

Test Case #4
- `Objective :` เพื่อทดสอบว่าสามารถอัปโหลดรูป Profile ได้ไม่เกินขนาด
- `Input to test case :` ทดสอบว่าสามารถอัปโหลดรูป Profile ได้ไม่เกิน 1MB
- `Test procedur :` ทดสอบอัปโหลดรูปภาพเกินขนาด 1MB
- `Expected results :` ไม่สามารถอัปโหลดรูปเกินขนาด 1MB ได้
---
#### `Module (filename) : addPost` `Function (method) : addPost` <br>

Test Case #1
- `Objective :` เพื่อทดสอบว่าสามารถสร้างโพสได้
- `Input to test case :` กรอกข้อมูลตามที่ต้องการใช้
- `Test procedure :` กด send เพื่อส่งข้อมูล
- `Expected results :` สามารถสร้างข้อมูลได้ถูกต้องตามที่กรอกไป

Test Case #2
- `Objective :` แก้ไขโพสเดิมที่ได้โพสไปแล้ว
- `Input to test case :` เปลี่ยนข้อมูลบางส่วนในโพส
- `Test procedure :` 
- `Expected results :` ข้อมูลที่ถูกแก้ไปแสดงได้อย่างถูกต้อง

Test Case #3
- `Objective :` เพื่อทดสอบว่าการเพิ่มที่จอดรถจำเป็นต้องกรอกข้อมูลให้ครบทุกตัว
- `Input to test case :` ไม่ใส่ข้อมูลใด ๆ เลย
- `Test procedure :` ไม่กรอกข้อมูลใด ๆ และกดเพิ่มที่จอดรถ
- `Expected results :` ไม่สามารถสร้างที่จอดรถได้

Test Case #4
- `Objective :` เพื่อทดสอบว่าการเพิ่มที่จอดรถต้องผ่านการยืนยันตัวตนครั้งแรก
- `Input to test case :` ไม่กรอกข้อมูลบัตรประชาชน
- `Test procedur :` ไม่กรอกข้อมูลบัตรประชาชนและเพิ่มที่จอดรถทันทีในครั้งแรก
- `Expected results :` ไม่สามารถเพิ่มที่จอดรถได้ ต้องผ่านการยืนยันตัวตนในครั้งแรก
---
#### `Module (filename) : editPost` `Function (method) : editPost`

Test Case #1
- `Objective :` เพื่อทดสอบว่าสามารถแก้ไข Post ได้ในทุกขั้นตอน
- `Input to test case :` แก้ไขข้อมูลทุกขั้นตอน
- `Test procedure :` เปลี่ยนแปลงข้อมูลทุกขั้นตอนและกดประกาศอีกครั้ง
- `Expected results :` ข้อมูลมีการเปลี่ยนแปลงตามที่แก้ไขทันที
---
`Module (filename) : deletePost` <br>
`Function (method) : deletePost` <br>

Test Case #1
- `Objective :` เพื่อทดสอบว่าสามารถลบ Post ที่จอดรถได้
- `Input to test case :` ลบที่จอดรถออก
- `Test procedure :` ลบที่จอดรถออกจากรายการของฉัน
- `Expected results :` ที่จอดรถที่ลบหายไปจากรายการของฉันและหน้า Profile
---
#### `Module (filename) : booking` `Function (method) : booking` 

Test Case #1
- `Objective :` เพื่อทดสอบว่าสามารถ Booking ที่จอดรถได้
- `Input to test case :` Booking ที่จอดรถ
- `Test procedure :` กด Booking ที่จอดรถและกรอกข้อมูลให้ครบ
- `Expected results :` สามารถ Booking ที่จอดรถได้
---
`Module (filename) : cancel booking` <br>
`Function (method) : cancel booking` <br>

Test Case #1
- `Objective :` เพื่อทดสอบว่าการ booking สามารถยกเลิกภายหลังได้
- `Input to test case :` cancel booking ที่จอดรถ
- `Test procedure :` กด cancel booking ที่จอดรถที่ได้ booking ไว้ก่อนหน้านี้
- `Expected results :` สามารถ Cancel Booking ที่จอดรถได้
---
#### `Module (filename) : check in` `Function (method) : check in` 

Test Case #1
- `Objective :` เพื่อทดสอบว่าสามารถ check in ที่จอดรถที่จองไว้ได้ (ผู้เช่า)
- `Input to test case :` check in ที่จอดรถ
- `Test procedure :` กด  check in ที่จอดรถที่ได้ booking ไว้ก่อนหน้านี้
- `Expected results :` สามารถ check in ที่จอดรถได้

Test Case #2
- `Objective :` เพื่อทดสอบว่าสามารถ check in ที่จอดรถที่จองไว้ได้ (ผู้ให้เช่า)
- `Input to test case :` check in ที่จอดรถ 
- `Test procedure :` กด  check in ที่จอดรถที่ได้ booking ไว้ก่อนหน้านี้
- `Expected results :` สามารถ check in ที่จอดรถได้
---
#### `Module (filename) : check out` `Function (method) : check out`

Test Case #1
- `Objective :` เพื่อทดสอบว่าสามารถ check out ที่จอดรถที่จองไว้ได้ (ผู้เช่า)
- `Input to test case :` check out ที่จอดรถ
- `Test procedure :` กด  check out ที่จอดรถที่ได้ check in ไว้ก่อนหน้านี้
- `Expected results :` สามารถ check out ที่จอดรถได้

Test Case #2
- `Objective :` เพื่อทดสอบว่าสามารถ check out ที่จอดรถที่จองไว้ได้ (ผู้ให้เช่า)
- `Input to test case :` check out ที่จอดรถ
- `Test procedure :` กด  check out ที่จอดรถที่ได้ check in ไว้ก่อนหน้านี้
- `Expected results :` สามารถ check out ที่จอดรถได้
---
#### `Module (filename) : comment` `Function (method) : comment` <br>

Test Case #1
- `Objective :` เพื่อทดสอบว่าผู้ใช้สามารถ comment ได้หลังจาก check out
- `Input to test case :` comment ที่จอดรถ
- `Test procedure :` เขียน comment ที่จอดรถหลังกด check out แล้ว submit
- `Expected results :` comment ขึ้นที่ที่จอดรถ
---
#### `Module (filename) : rating` `Function (method) : rating` 

Test Case #1
- `Objective :` เพื่อทดสอบว่าผู้ใช้สามารถให้ rating ได้หลังจาก check out
- `Input to test case :` ให้ rating ที่จอดรถ
- `Test procedure :` ให้ rating ที่จอดรถหลังกด check out แล้ว submit
- `Expected results :` rating ขึ้นที่ที่จอดรถ
---
#### `Module (filename) : admin` `Function (method) : admin` <br>

Test Case #1
- `Objective :` เพื่อทดสอบว่าสามารถยืนยันตัวตนให้กับผู้ใช้ได้
- `Input to test case :` ยืนยันตัวตนให้กับผู้ใช้งาน
- `Test procedure :` กดยืนยันตัวตนให้กับผู้ใช้งานที่ส่งคำร้องการยืนยันตัวตนเข้ามา
- `Expected results :` ผู้ใช้งานสามารถเพิ่มที่จอดรถได้หลังกดยืนยันตัวตน

Test Case #2
- `Objective :` เพื่อทดสอบว่าสามารถลบผู้ใช้ได้
- `Input to test case :` ลบผู้ใช้งาน
- `Test procedure :` กด delete เพื่อลบผู้ใช้งานทิ้ง
- `Expected results :` สามารถลบบัญชีผู้งใช้งานได้
---
#### `Module (filename) : search` `Function (method) : search` 

Test Case #1
- `Objective :` เพื่อทดสอบว่าสามารถค้นหาที่จอดรถตามชื่อสถานที่ได้
- `Input to test case :` ใส่ชื่อสถานที่ที่ต้องการค้นหา
- `Test procedure :` ใส่ชื่อสถานที่และกดค้นหา 
- `Expected results :` ได้สถานที่ตามที่ค้นหา

Test Case #2
- `Objective :` เพื่อทดสอบว่าสามารถค้นหาที่จอดรถตาม GPS
- `Input to test case :` ใส่ชื่อตำแหน่งที่ที่ต้องการค้นหา
- `Test procedure :` ใส่ชื่อตำแหน่งและกดค้นหา 
- `Expected results :` ได้สถานที่ตามที่ค้นหา
---


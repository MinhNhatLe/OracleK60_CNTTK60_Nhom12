import React from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import './form.scss';
function Form() {
  return (
    <div className="container">
      <div className="content">
        <form className="form-content" id="Form">
          <div className="form-title">
            <h2 id="p1">DỮ LIỆU ĐIỂM THI</h2>
            <h3 id="p2">TRA CỨU ĐIỂM THI TỐT NGHIỆP THPT QUỐC GIA 2022</h3>
          </div>
          <div className="form-input">
            <div className="input-guide">
            </div>
            <div className="input-group">
              <div className='input-form'>
                <p id="msg">Vui lòng nhập số gồm 7 ký tự </p>
                <label htmlFor="sbd">Nhập số báo danh:</label>
                <input
                  type="text"
                  id="sbd"
                  name="sbd"
                  maxLength="7"
                  size="7"
                  autoFocus
                  autoComplete="off"
                  placeholder="Ví dụ: 1000001"
                  onKeyUp={idCheck}
                  pattern="[0-9]{7}"
                  required
                />
              </div>
              <div className="reload">
                <a
                  href="javascript:document.location.reload();"
                  onmouseout="window.status='default'"
                  onmouseover="window.status='Refresh'; return true"
                >
                  <i class="bi bi-arrow-clockwise"></i>
                </a>
              </div>
            </div>
          </div>
          <ReCAPTCHA
            onChange={captchaHandle}
            id="captcha"
            className="captcha"
            size="normal"
            data-theme="dark"
            render="explicit"
            sitekey="6LcWLvIhAAAAAH6V9xminkJUAyGPMIZWxaP_luPu"
          />
          <div className="form-click">
            <div className="form-button" id="btn">
              <button type="submit" onclick = {blockForm}> Tìm kiếm </button>
            </div>
          </div>
          <div className="form-score">
            <p id="score">Điểm của các môn: </p>
            <div id="data-form"></div>
          </div>
        </form>
      </div>
    </div>
  );
}

function blockForm(){
  document.getElementById('sbd').readOnly.true;
}

function idCheck() {
  let flag = false;
  const input = document.getElementById('sbd').value;
  const text = document.getElementById('msg');
  if (input.length <= 6) {
    text.style.visibility = 'visible';
    flag = false;
  } else if (isNaN(input)) {
    text.style.visibility = 'visible';
    flag = false;
  } else {
    text.style.visibility = 'hidden';
    flag = true;
  }
  return flag;
}
function sumscore(a, b, c) {
  let sum = '0.0';
  sum = (a + b + c) / 3;
  return sum;
}
function captchaHandle() {
  document.getElementById('btn').style.visibility = 'visible';
  let sbd = document.querySelector('#sbd').value;
  const div = document.getElementById('data-form');
  document.querySelector('.form-button').addEventListener('click', (event) => {
    if (idCheck()) {
      fetch(`http://localhost:8080/api/student/${sbd}`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'User-Agent': 'request',
          'Access-Control-Allow-Origin': '*'
        }
      })
        .then((res) => {
          if (res.status === 404)
            div.innerHTML = `<p style = "font-size:20px;text-align:center;color:red;word-spacing: 1px;">Không tìm thấy dữ liệu của thí sinh!</p>`;
          else {
            Promise.resolve(res.json()).then((dung) => {
              if (
                dung.history == 0.0 &&
                dung.geography == 0.0 &&
                dung.civicEdu == 0.0
              ) {
                document.getElementById('score').style.visibility = 'visible';
                div.innerHTML = ` <p>
                    Toán Học: ${dung.maths}
                    Ngữ Văn: ${dung.literatures}
                    Ngoại Ngữ: ${dung.foreignLang}
                    Vậy Lý: ${dung.physics}
                    Hóa Học: ${dung.chemistry}
                    Sinh Học: ${dung.biology}
                    KHTN: ${sumscore(
                      parseFloat(dung.physics),
                      parseFloat(dung.chemistry),
                      parseFloat(dung.biology)
                    ).toFixed(3)} </p> `;
              } else {
                document.getElementById('score').style.visibility = 'visible';
                div.innerHTML = ` <p>
                    Toán Học: ${dung.maths}
                    Ngữ Văn: ${dung.literatures}
                    Ngoại Ngữ: ${dung.foreignLang}
                    GDCD: ${dung.civicEdu}
                    Lịch Sử: ${dung.history}
                    Địa Lý: ${dung.geography}
                    KHXH: ${sumscore(
                      parseFloat(dung.civicEdu),
                      parseFloat(dung.history),
                      parseFloat(dung.geography)
                    ).toFixed(3)}
                     </p> `;
              }
            });
          }
        })
        .catch((err) => console.error(err));
        document.querySelector("#sbd").readOnly = true;
      event.preventDefault();
    }
  });
}

export default Form;

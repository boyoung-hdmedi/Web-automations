const express = require('express'); 
const path = require('path');
const app = express();  //Express app 생성
const { exec } = require('child_process'); //JS 내에서 다른 언어를 허용
const cors = require('cors'); // 클라이언트<-> 서버 통신 시 발생하는 보안 문제 허용

app.use(cors());
app.use(express.json());    // POST 요청을 받기 위한 JSON Data 파싱

app.post('/exe', (req, res) => {
    const requestData = req.body;
    const title = requestData.title;
    const password = requestData.password;

    console.log(`Received title: ${title}, password: ${password}`);

     // 입력값 검증
     if (!title || !password) {
        res.status(400).json({ success: false, message: 'Title and password are required' });
        return;
    }

    // C# 프로그램 실행 (cmd.exe를 통해 실행)
    /** c# executable이 존재하는 경로 수정이 필요함 */
    const command = `cmd.exe /c "chcp 65001 > nul && "C:\\Users\\Desktop\\cap.exe" \"${title}\" \"${password}\"`;
   
    exec(command, { encoding: 'utf8' }, (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`);
            res.status(500).json({ success: false, message: 'C# Program FAIL' });
            return;
        }
        console.log(`stdout: ${stdout}`);
        console.error(`stderr: ${stderr}`);
        
        res.status(200).json({ success: true, message: 'C# Program SUCCESS', output: stdout, errorOutput: stderr });
    });
});

// 라우트 핸들러 설정 (app 디렉토리 내에서만 작동하도록)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'main.html'));
});

// port 3000번에서 HTTP 서버 실행
app.listen(3000, () => {
    console.log("start! express server on port 3000");
});
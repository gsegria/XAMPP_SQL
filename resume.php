<?php
$uploaded = false;
if ($_SERVER["REQUEST_METHOD"] === "POST" && isset($_FILES["photo"])) {
    $target_dir = "uploads/";
    if (!is_dir($target_dir)) {
        mkdir($target_dir, 0777, true); // 建立 uploads 資料夾
    }

    $file_name = basename($_FILES["photo"]["name"]);
    $target_file = $target_dir . $file_name;
    $file_type = strtolower(pathinfo($target_file, PATHINFO_EXTENSION));

    // 安全檢查：只允許圖片
    $allowed_types = ["jpg", "jpeg", "png", "gif", "webp"];
    if (in_array($file_type, $allowed_types) && $_FILES["photo"]["size"] < 2 * 1024 * 1024) { // 2MB 限制
        if (move_uploaded_file($_FILES["photo"]["tmp_name"], $target_file)) {
            $uploaded = $target_file;
        }
    }
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Ping Hsu - Resume</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background: #f4f4f4;
      margin: 0;
      padding: 0;
    }

    .container {
      max-width: 900px;
      margin: auto;
      padding: 30px;
      background: #fff;
    }

    h1, h2, h3 {
      color: #2c3e50;
      margin-top: 30px;
    }

    .contact-info, .section {
      margin-bottom: 25px;
    }

    .contact-info p {
      margin: 5px 0;
    }

    ul.skills {
      columns: 2;
      list-style-type: square;
      padding-left: 20px;
    }

    .job {
      margin-bottom: 20px;
    }

    .job h3 {
      margin-bottom: 5px;
      font-size: 1.1em;
    }

    .job span {
      color: #555;
      font-size: 0.9em;
    }

    .education {
      margin-top: 15px;
    }

    /* 右上角大頭照框 */
    .top-right-photo {
      position: fixed;
      top: 20px;
      right: 20px;
      width: 120px;
      height: 120px;
      border-radius: 50%;
      border: 3px solid #ccc;
      overflow: hidden;
      background: #eee;
      box-shadow: 0 2px 8px rgba(0,0,0,0.2);
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .top-right-photo img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    /* 上傳表單簡潔樣式 */
    .upload-form {
      position: fixed;
      top: 150px;
      right: 20px;
      background: #fff;
      padding: 10px;
      border-radius: 8px;
      box-shadow: 0 2px 6px rgba(0,0,0,0.1);
      font-size: 14px;
    }

    .upload-form input[type="file"] {
      margin-bottom: 5px;
    }
  </style>
</head>
<body>

  <!-- 右上角照片框 -->
  <div class="top-right-photo">
    <?php if ($uploaded): ?>
      <img src="<?= htmlspecialchars($uploaded) ?>" alt="Uploaded Photo">
    <?php else: ?>
      <img src="http://localhost/chatbot/pics/my.png" alt="Default Photo">
    <?php endif; ?>
  </div>

  <!-- 照片上傳表單 -->
  <form class="upload-form" method="post" enctype="multipart/form-data">
    <label>上傳大頭貼</label><br>
    <input type="file" name="photo" accept="image/*" required><br>
    <input type="submit" value="上傳">
  </form>


    <div class="container">
        <h1>Ping Hsu</h1>
        <div class="contact-info">
            <p><strong>Location:</strong> Taiwan</p>
            <p><strong>Email:</strong> <a href="mailto:pinghsu104@gmail.com">pinghsu104@gmail.com</a></p>
            <p><strong>Phone:</strong> +886-936-138-808</p>
            <p><strong>LinkedIn:</strong> <a href="https://linkedin.com/in/ping-h-32b485104" target="_blank">linkedin.com/in/ping-h-32b485104</a></p>
        </div>

        <h2>Skills & Experience</h2>
        <ul class="skills">
            <li>Keil C/C++</li>
            <li>Visual Studio (MFC)</li>
            <li>Qt, wxWidgets</li>
            <li>STM32CubeIDE / Programmer</li>
            <li>STM32H7, MSP430, DSP C5000</li>
            <li>8051, 6502, ARM9</li>
            <li>S5PV210, IDK310, Arduino, Banana Pi</li>
            <li>Project planning & team leadership</li>
            <li>Embedded systems design</li>
            <li>Automation with Python, Lua</li>
        </ul>

        <h2>Professional Experience</h2>

        <div class="job">
            <h3>ACHB Enterprise Co. – Senior Firmware Engineer</h3>
            <span>Taiwan City, Taiwan | 2025</span>
            <ul>
                <li>Enhanced GUI usability for medical devices</li>
                <li>Integrated client-specific features and resolved product issues</li>
                <li>Managed development schedules and test planning</li>
            </ul>
        </div>

        <div class="job">
            <h3>EpoStar / YEESTOR Microelectronics Co., Ltd – Technical Deputy Manager</h3>
            <span>Hsinchu, Taiwan | 2017–2025</span>
            <ul>
                <li>Developed tools for MP, PCIe, USB bridge, and GUI scripting</li>
                <li>Built validation test platforms and auto-test scripts</li>
                <li>Created DLLs and automation scripts in C++, Python, and Lua</li>
            </ul>
        </div>

        <div class="job">
            <h3>IMEDIPLUS INC. – Deputy Manager</h3>
            <span>Hsinchu, Taiwan | 2014–2017</span>
            <ul>
                <li>Led Bluetooth medical device firmware development</li>
                <li>Designed DSP algorithms, UI systems, and wireless protocols</li>
                <li>FDA 510(K) contributor (K160023); National Innovation Prize winner</li>
            </ul>
        </div>

        <div class="job">
            <h3>SMART Modular Technologies – Staff System Engineer</h3>
            <span>New Taipei, Taiwan | 2013–2014</span>
            <ul>
                <li>Designed NAND flash modules and verification platforms</li>
                <li>Supported Android ARM platform evaluation</li>
            </ul>
        </div>

        <div class="job">
            <h3>KeyStone Semiconductor Corp. – Principal Engineer</h3>
            <span>Hsinchu, Taiwan | 2010–2013</span>
            <ul>
                <li>Developed DAB system firmware and bootloaders</li>
                <li>Automated development processes</li>
                <li>Mentored junior engineers</li>
            </ul>
        </div>

        <div class="job">
            <h3>Silicon Motion Technology Corp. – Senior Engineer</h3>
            <span>Hsinchu, Taiwan | 2005–2009</span>
            <ul>
                <li>Created MFC tools for design and testing</li>
                <li>Conducted system verification and F/W testing</li>
            </ul>
        </div>

        <div class="job">
            <h3>ABON-TECH INTERNATIONAL CORP. – Sr. Staff Engineer</h3>
            <span>Hsinchu, Taiwan | 2003–2005</span>
            <ul>
                <li>Led customer communication for LCD SG products in Japan</li>
                <li>Managed full product lifecycle</li>
            </ul>
        </div>

        <div class="job">
            <h3>RAIO Technology Inc. – Deputy Engineer</h3>
            <span>Hsinchu, Taiwan | 2001–2003</span>
            <ul>
                <li>Supported Speech IC projects</li>
                <li>Managed documentation and sample preparation</li>
            </ul>
        </div>

        <h2>Education</h2>
        <div class="education">
            <p><strong>Minghsin University of Science and Technology</strong></p>
            <p>Master's Degree – July 2017</p>
        </div>
    </div>
</body>
</html>

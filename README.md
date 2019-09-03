# 串接 Google 表單（問卷）

讀取 Google 問卷、投票、取得結果數據

## Demo  
網頁：
> https://google-forms.herokuapp.com/admin  

Google Form：
> https://docs.google.com/forms/d/e/1FAIpQLSesrkfMB0dmXl67abKqdkqYuG6lBID9QuHWFh4_ueTn3UZUZQ/viewform   

Google Sheet：
> https://docs.google.com/spreadsheets/d/1cjc1VDMqxySbvqoHsE9otQ89tS5HmVcKIDGhzmRUc0M/edit#gid=471971812

----------

## Step1: Google Form 的 id
> https://docs.google.com/forms/d/e/GOOGLE_FORM_ID/viewform
    
    以變數 $googleFormId 儲存

## Step2: Google Sheet 的 id
> https://docs.google.com/spreadsheets/d/GOOGLE_SHEET_ID/edit#gid=471971812
    
    以變數 $googleSheetId 儲存

## Step3: 發布 Google Sheet
    檔案 > 發佈到網路

## Step4: 引入所需檔案    
    <?php require('./component/questionnaire.php'); ?>
    
    bootstrap、font-awesome
    <link rel="stylesheet" type="text/css" href="css/questionnaire.css" />

    jQuery、bootstrap、vue
    <script type="text/javascript" src="js/questionnaire.js"></script>

## 潛規則
    暫時只接收 3 種題型：單選、多選、簡答 
    其中，單選、多選可能有「其他」的欄位選項
    簡答題：欄位名稱若包含「電話、手機」、「Email、email、郵件、信箱」會被檢查格式



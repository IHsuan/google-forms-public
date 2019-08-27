<!doctype html>
<html lang="zh-Hant">
<head>
<?php
    $keywords = '';
    $description = '';
    $title = '';
    $page = 'admin';
    require('./component/common/head.php');
?>
</head>





<body>
<?php require('./component/header.php'); ?>

<div class="ih-page-<?php echo $page ?> ih-page">
    <div class="ih-section-form">
        <div class="row">
            <div class="col-12 col-md-6 offset-md-3 col-xl-4 offset-xl-4">
                <h1 class="ih-margin-bottom-30 text-center">
                    問卷
                </h1>

                <form action="./index.php" method="post">
                    <div class="form-group">
                        <label for="googleFormId">Google Form ID</label>
                        <input type="text" class="form-control" id="googleFormId" name="googleFormId" value="1FAIpQLSesrkfMB0dmXl67abKqdkqYuG6lBID9QuHWFh4_ueTn3UZUZQ">
                    </div>
                    <div class="form-group">
                        <label for="googleSheetId">Google Sheet ID</label>
                        <input type="text" class="form-control" id="googleSheetId" name="googleSheetId" value="1cjc1VDMqxySbvqoHsE9otQ89tS5HmVcKIDGhzmRUc0M">
                    </div>

                    <button type="submit" class="btn btn-dark float-right">
                        送出
                    </button>
                </form>
            </div>        
        </div>
    </div>
</div>

<?php require('./component/footer.php'); ?>

<?php require('./component/common/foot.php'); ?>

</body>
</html>

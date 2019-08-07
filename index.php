<!doctype html>
<html lang="zh-Hant">
<head>
<?php
    $keywords = '';
    $description = '';
    $title = '';
    $page = 'index';
    require('./component/common/head.php');
?>
</head>





<body>
<?php require('./component/header.php'); ?>

<div class="ih-page-<?php echo $page ?> ih-page">
    <div class="ih-section-questionnaire">
        <div class="ih-container container-fluid">
            <div class="row">
                <div class="col-12 col-md-6 offset-md-3 col-xl-4 offset-xl-4">
                    
                    <!-- google 表單（問卷） -->
                    <?php require('./component/questionnaire.php'); ?>
                
                </div>
            </div>
        </div>
    </div>
</div>

<?php require('./component/footer.php'); ?>

<?php require('./component/common/foot.php'); ?>

</body>
</html>

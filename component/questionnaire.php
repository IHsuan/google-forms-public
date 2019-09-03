<?php
    // $googleFormId = '1FAIpQLSesrkfMB0dmXl67abKqdkqYuG6lBID9QuHWFh4_ueTn3UZUZQ';
    // $googleSheetId = '1cjc1VDMqxySbvqoHsE9otQ89tS5HmVcKIDGhzmRUc0M';
?>

<div class="ih-component-questionnaire" id="questionnaire">
    <h1 class="ih-margin-bottom-30 text-center">
        {{ heading }}
    </h1>
    <form class="ih-form"
        @submit.prevent="submit"
        action="//docs.google.com/forms/d/e/<?php echo $googleFormId ?>/formResponse"
        data-sheet-id="<?php echo $googleSheetId ?>">
        
        <ol>
            <template v-for="question in questionList">
                <!-- 單選、多選 -->
                <li v-if="['radio', 'checkbox'].indexOf(question.type) !== -1">
                    <p class="ih-question">
                        {{ question.question }}
                    </p>
                    <div class="ih-option"
                        :class="`ih-theme-${question.type}`" 
                        v-for="(answer, idx) in question.answerList">
                        <input class="ih-opacity-0"
                            :type="question.type" 
                            :id="`${question.name}-${idx}`" 
                            :name="question.name"
                            value="__other_option__"
                            :required="question.required"
                            @change="isAnswerOtherRequired(question)"
                            v-if="question.answerOther.name && (idx + 1 === question.answerList.length)">
                        <input class="ih-opacity-0"
                            :type="question.type" 
                            :id="`${question.name}-${idx}`" 
                            :name="question.name"
                            :value="answer"
                            :required="question.required"
                            v-else>
                        <label class="ih-pointer" 
                            :for="`${question.name}-${idx}`">
                            <i class="fa fa-circle-o" aria-hidden="true"></i>
                            {{ answer }}
                        </label>
                    </div>
                    <input class="ih-input-text form-control"
                        type="text"
                        :name="question.answerOther.name"
                        :required="question.answerOther.required"
                        :disabled="!question.answerOther.required"
                        v-if="question.answerOther.name"> 
                </li>

                <!-- 3: 簡答 -->
                <li v-if="['text', 'tel', 'email'].indexOf(question.type) !== -1">
                    <label class="ih-question"
                        :for="question.name">
                        {{ question.question }}
                    </label>
                    <input class="ih-input-text form-control"
                        :type="question.type"
                        :id="question.name"
                        :name="question.name"
                        :required="question.required">
                </li>
            </template>
        </ol>
        
        <div class="text-center">
            <button type="submit" class="ih-submit ih-button">
                送出投票
            </button>
        </div>
    </form>

    <div class="ih-modal modal" id="questionnaire-modal" tabindex="-1" role="dialog">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header justify-content-center">
                    <h5 class="modal-title">
                        {{ message }}
                    </h5>
                </div>

                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" data-dismiss="modal">
                        確認
                    </button>
                </div>
            </div>
        </div>
    </div>
</div>

<?php
    // TODO: 爬蟲
    $web = file_get_contents('https://docs.google.com/forms/d/e/'.$googleFormId.'/viewform');    
    preg_match("/<form[^>]*?>(.*\s*?)<\/form>/is", $web, $form);
    echo '<div class="ih-hide" id="spider">'.$form[0].'</div>';
?>

$(window).on('load', function () {

    class Question {
        constructor() {
            this.type = '';
            this.name = '';
            this.required = false;

            this.question = '';
            this.answerList = [];
            this.answerOther = {
                name: '',
                required: false
            };
        }
    }



    new Vue({
        el: '#questionnaire',
        data: {
            message: '',
            heading: '',
            description: '',
            questionList: []
        },

        methods: {
            submit() {
                const self = this;
                const $form = $('#questionnaire form');
                const actionUrl = $form.attr('action');
                const sheetId = $form.attr('data-sheet-id');

                $.ajax({
                    method: 'POST',
                    url: actionUrl,
                    data: $form.serialize()
                }).done((res) => {
                }).fail((err) => {
                }).always((res) => {
                    $('#questionnaire-modal').modal('show');

                    if ([0, 200].indexOf(res.readyState) !== -1) {
                        self.message = '感謝您的參與 ^ ^';
                    } else {
                        self.message = '連線異常！請再試一次';
                        return
                    }



                    // ===== 讀取結果（Google Sheet）=====
                    const ary = [];
                    $.get(`//spreadsheets.google.com/feeds/list/${sheetId}/1/public/values?alt=json`, (data) => {
                        data.feed.entry.forEach((item) => {
                            const obj = {};
                            const props = Object.keys(item)
                                .filter((prop) => {
                                    return prop.indexOf('gsx$') !== -1
                                });

                            props.forEach((prop) => {
                                const key = prop.replace('gsx$', '');
                                obj[key] = item[prop]['$t']
                            });

                            ary.push(obj);
                        });

                        // TODO: 後續資料分析
                        console.log(ary.length);
                        console.log(JSON.stringify(ary));
                    });



                    $('#questionnaire-modal').on('hidden.bs.modal', () => {
                        alert(JSON.stringify(ary));
                    });

                });
            },

            isAnswerOtherRequired(question) {
                question.answerOther.required = !question.answerOther.required;
            }
        },
        mounted() {
            const self = this;

            // ===== Google 表單（問卷） =====
            self.heading = $('#spider .freebirdFormviewerViewHeaderTitle').text().trim();
            self.description = $('#spider .freebirdFormviewerViewHeaderDescription').text().trim();

            $('#spider .freebirdFormviewerViewNumberedItemContainer').each(function () {
                const $container = $(this);
                const question = new Question();

                // ===== 題型 =====
                // 單選 freebirdFormviewerViewItemsRadioOptionContainer
                // 多選 freebirdFormviewerViewItemsCheckboxOptionContainer
                // 簡答 freebirdFormviewerViewItemsTextShortText
                const questionTypes = [{
                    class: '.freebirdFormviewerViewItemsRadioOptionContainer',
                    type: 'radio'
                }, {
                    class: '.freebirdFormviewerViewItemsCheckboxOptionContainer',
                    type: 'checkbox'
                }, {
                    class: '.freebirdFormviewerViewItemsTextShortText',
                    type: 'text'
                }];

                questionTypes.find((item) => {
                    const matched = !!$container.find(item.class).length;

                    if (matched) {
                        question.type = item.type;
                    }
                    return matched;
                });

                // 非以上題型，暫不處理
                if (!question.type) {
                    return;
                }



                // ===== name =====
                switch (question.type) {
                    case 'radio':
                    case 'checkbox':
                        question.name = $container.find('input[type=hidden]:disabled').attr('name');
                        break;
                    case 'text':
                        question.name = $container.find('input').attr('name');
                        break;
                }



                // ===== required =====
                // NOTE: 多選只能設 false，需另行檢查
                const isRequired = !!$container.find('.freebirdFormviewerViewItemsItemRequiredAsterisk').length;
                if (question.type !== 'checkbox' && isRequired) {
                    question.required = true;
                }



                // ===== 問題 =====
                question.question = $container.find('.freebirdFormviewerViewItemsItemItemTitle').text().trim();

                // 電話、email 特別處理
                if (question.type === 'text') {
                    const telRule = ['電話', '手機'];
                    const matchedTelRule = telRule.some((items) => {
                        return question.question.indexOf(items) !== -1;
                    });
                    if (matchedTelRule) {
                        question.type = 'tel';
                    }

                    const emailRule = ['Email', 'email', '郵件', '信箱'];
                    const matchedEmailRule = emailRule.some((items) => {
                        return question.question.indexOf(items) !== -1;
                    });
                    if (matchedEmailRule) {
                        question.type = 'email';
                    }
                }



                // ===== 答案 =====
                // 單選、多選
                if (['radio', 'checkbox'].indexOf(question.type) !== -1) {
                    $container.find('.exportLabel').each(function () {
                        question.answerList.push($(this).text().trim());
                    });

                    // 單選其他 freebirdFormviewerViewItemsRadioOtherChoice
                    // 多選其他 freebirdFormviewerViewItemsCheckboxOtherChoice
                    ['.freebirdFormviewerViewItemsRadioOtherChoice', '.freebirdFormviewerViewItemsCheckboxOtherChoice'].forEach((checkClass) => {
                        if (!!$container.find(checkClass).length) {
                            question.answerOther.name = `${question.name}.other_option_response`;
                        }
                    });
                }



                self.questionList.push(question);
            });
        }
    });

});

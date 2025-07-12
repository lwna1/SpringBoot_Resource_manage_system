(function ()
{
    //找回密码步骤变量
    let nowStep = 1            //进行的步骤
    let nowUserName = ''        //用户输入的用户名
    let questionData                   //获取到的密保
    let answer                         //用户输入的答案
    //密码是否都符合条件，符合条件之后才可以修改
    let password_one_Right = 0
    let password_two_Right = 0
    //获取元素
    const step_oneDiv =document.querySelector('.step1')                 //步骤一的大盒子
    const step_twoDiv =document.querySelector('.step2')                 //步骤二的大盒子
    const step_threeDiv =document.querySelector('.step3')               //步骤三的大盒子
    const btnStep_one = document.querySelector('.step1 .btnStep_1')     //步骤一中的按钮
    const inputStep_one = document.querySelector('.step1 .inputStep_1') //步骤一中的输入框
    const btnStep_two = document.querySelector('.step2 .btnStep_2')     //步骤二中的按钮
    const inputStep_two = document.querySelector('.step2 .inputStep_2') //步骤二中的输入框
    const questionStep_two = document.querySelector('.step2 .questionStep_2') //步骤二中的密保问题框
    const password_first = document.querySelector('.step3 .password_first')   //初始密码
    const password_second = document.querySelector('.step3 .password_second') //确认密码
    const btnStep_three = document.querySelector('.step3 .btnStep_3')   //步骤三中的按钮
    const line_1 = document.querySelector('.allSteps .line_1')          //直线1
    const line_2 = document.querySelector('.allSteps .line_2')          //直线2
    const Step_li_1 = document.querySelector('.allSteps .allSteps_Step1') //第一个li
    const Step_li_2 = document.querySelector('.allSteps .allSteps_Step2') //第二个li
    const Step_li_3 = document.querySelector('.allSteps .allSteps_Step3') //第三个li
    const Step1_err = document.querySelector('.step1 .step1_err')         //步骤一中的错误提示
    const Step2_err = document.querySelector('.step2 .step2_err')         //步骤二中的错误提示
    const passwordErr_1 = document.getElementById("passwordErr_1")   //步骤三中的错误提示一
    const passwordErr_2 = document.getElementById("passwordErr_2")   //步骤三中的错误提示二
    const alertDiv = document.querySelector('.alert')                     //弹出框
    const alertBtn = document.querySelector('.alert input')               //弹出框确定
    //更新页面页签事件
    function update()
    {
        if (nowStep === 1)
        {
            step_oneDiv.style.display = 'block'
            step_twoDiv.style.display = 'none'
            step_threeDiv.style.display = 'none'
            Step_li_1.style.backgroundColor = 'skyblue'
            Step_li_1.style.color = 'white'
        }else if (nowStep === 2)
        {
            axios.get(`/FindPassword/getQuestion?userName=${nowUserName}`).then(result=>{
                questionData = result.data.data
            }).finally(()=>{
                step_oneDiv.style.display = 'none'
                step_twoDiv.style.display = 'block'
                step_threeDiv.style.display = 'none'
                line_1.style.borderColor = 'skyblue'
                Step_li_2.style.backgroundColor = 'skyblue'
                Step_li_2.style.color = 'white'
                questionStep_two.innerHTML = `问题:${questionData.question}`
            })
        }else if (nowStep === 3)
        {
            step_oneDiv.style.display = 'none'
            step_twoDiv.style.display = 'none'
            step_threeDiv.style.display = 'block'
            line_2.style.borderColor = 'skyblue'
            Step_li_3.style.backgroundColor = 'skyblue'
            Step_li_3.style.color = 'white'
        }
    }
    //执行初始化更新操作
    update()
    //btnStep_one点击事件(判断用户名是否正确，正确则进入下一步)
    btnStep_one.addEventListener('click',function ()
    {
        nowUserName = inputStep_one.value
        if (nowUserName !== '')
        {
            axios.get(`/FindPassword/userNameRight?userName=${nowUserName}`).then(result=>{
                if (result.data.code === 1)   //如果存在这个用户名
                {
                    nowStep += 1
                    update()
                }else
                {
                    Step1_err.style.display = 'block'
                }
            })
        }
    })

    //btnStep_two点击事件(判断答案是否正确，正确则进入下一步)
    btnStep_two.addEventListener('click',function ()
    {
        answer = inputStep_two.value
        if (answer === questionData.answer)   //如果相同
        {
            nowStep += 1
            update()
        }else
        {
            Step2_err.style.display = 'block'
        }
    })

    //btnStep_three点击事件(进行修改密码)
    btnStep_three.addEventListener('click',function ()
    {
        let password_1 = password_first.value
        let password_2 = password_second.value
        if (password_1 === password_2 && password_1 !== ''  && password_one_Right === 1 && password_two_Right === 1)
        {
            axios.get(`/FindPassword/updatePassword?userId=${questionData.userId}&newPassword=${password_1}`).then(result=>{
                if (result.data.code === 1)
                {
                    alertDiv.style.display = 'block'
                    btnStep_three.setAttribute('disabled','true')
                }
            })
        }
    })

    //弹出框按钮点击后回到登录页面
    alertBtn.addEventListener('click',function ()
    {
        window.location.href = 'login.html'
    })

    //输入框内容改变事件，为空让按钮颜色为0.5，不为空变为1
    inputStep_one.addEventListener('input',function ()
    {
        if (inputStep_one.value === '')
        {
            btnStep_one.style.opacity = '0.5'
        }else
        {
            btnStep_one.style.opacity = '1'
        }
    })

    //输入框内容改变事件，为空让按钮颜色为0.5，不为空变为1
    inputStep_two.addEventListener('input',function ()
    {
        if (inputStep_two.value === '')
        {
            btnStep_two.style.opacity = '0.5'
        }else
        {
            btnStep_two.style.opacity = '1'
        }
    })

    //初始密码框失焦事件
    password_first.addEventListener('blur',function ()
    {
        if (password_first.value.length < 6)
        {
            password_one_Right = 0
            passwordErr_1.className = 'passwordError'
            passwordErr_1.innerHTML = '密码长度不能小于6'
        }else if (password_first.value.length > 25)
        {
            password_one_Right = 0
            passwordErr_1.className = 'passwordError'
            passwordErr_1.innerHTML = '密码长度不能大于25'
        }else if (!(/[0-9]+/.test(password_first.value) && (/[a-z]+/.test(password_first.value) || /[A-Z]+/.test(password_first.value)))) //需要既有字母又有数字
        {
            password_one_Right = 0
            passwordErr_1.className = 'passwordError'
            passwordErr_1.innerHTML = '密码需要同时有字母和数字'
        }else //密码正确
        {
            console.log(/[0-9]+/.test(password_first.value))
            console.log((/[a-z]+/.test(password_first.value) || /[A-Z]+/.test(password_first.value)))
            password_one_Right = 1
            passwordErr_1.className = 'passwordRight'
            passwordErr_1.innerHTML = '密码格式正确'
        }
    })

    //初始密码框输入按钮事件
    password_first.addEventListener('input',function ()
    {
        if (password_first.value === '')
        {
            btnStep_three.style.opacity = '0.5'
        }else
        {
            btnStep_three.style.opacity = '1'
        }
    })

    //确认密码框失焦事件
    password_second.addEventListener('blur',function ()
    {
        if (password_first.value !== password_second.value)
        {
            password_two_Right = 0
            passwordErr_2.className = 'passwordError'
            passwordErr_2.innerHTML = '密码前后不一致'
        }else if (password_one_Right === 1 && password_first.value === password_second.value)
        {
            password_two_Right = 1
            passwordErr_2.className = 'passwordRight'
            passwordErr_2.innerHTML = '密码前后一致'
        }
    })
})()
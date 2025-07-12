(function ()
{
    if (sessionStorage.getItem("user") === null)
    {
        window.location.href = 'login.html'
    }else
    {
        //获取用户信息
        let userData = JSON.parse(sessionStorage.getItem("user"))
        console.log(userData)
        //切换页面信息
        let SpaceNavigateNum = 1
        let AlertType = 0

        //获取需要的标签元素
        const Alert = document.querySelector('.alert')
        const Alert_Content = document.querySelector('.alert .Alert_Content .Alert_P') //弹出框内容
        const Alert_Btn = document.querySelector('.alert .Alert_Content .Alert_Btn')      //弹出框确认按钮
        const TotalInfo_avatar = document.querySelector('.MySpace .TotalInfo img')         //用户头像
        const TotalInfo_nickName = document.querySelector('.MySpace .TotalInfo .TotalInfo_P_Div .TotalInfo_nickName') //用户昵称
        const TotalInfo_userName = document.querySelector('.MySpace .TotalInfo .TotalInfo_P_Div .TotalInfo_userName') //用户名
        const TotalInfo_span_favorite = document.querySelector('.MySpace .TotalInfo .TotalInfo_P_Div .span_favorite') //收藏个数
        const TotalInfo_span_comment = document.querySelector('.MySpace .TotalInfo .TotalInfo_P_Div .span_comment')   //评论个数
        const SpaceNavigate_ArrLi = document.querySelectorAll('.MySpace .SpaceNavigate ul li')   //侧边导航栏li
        const Specific_MyInfo = document.querySelector('.MySpace .MyInfo')  //我的信息
        const Specific_MyFavorite = document.querySelector('.MySpace .MyFavorite')  //我的收藏
        const Specific_AccountManage = document.querySelector('.MySpace .AccountManage') //账号管理
        const Specific_ResourceManage = document.querySelector('.MySpace .ResourceManage') //资源管理
        const ChangeNickName_Input = document.querySelector('.MySpace .MyInfo .NickName_Div .ChangeNickNameInput') //修改昵称输入框
        const ChangeNickName_Btn = document.querySelector('.MySpace .MyInfo .NickName_Div .ChangeNickNameBtn')     //修改昵称按钮
        const ChangeNickName_Err = document.querySelector('.MySpace .MyInfo .NickName_Div .ChangeNickName_Err')    //修改昵称错误
        const Avatar_Upload_Btn = document.querySelector('.MySpace .MyInfo .Avatar_Div .Avatar_Upload_Div .Avatar_Upload_Btn') //上传图片按钮
        const Avatar_Upload_File = document.querySelector('.ShowSpecific .MyInfo .Avatar_Div  input[type=\'file\']') //文件按钮
        const Avatar_Upload_Img = document.querySelector('.MySpace .MyInfo .Avatar_Div img')       //预览图片
        const Avatar_Change_Btn = document.querySelector('.ShowSpecific .MyInfo .Avatar_Div .Avatar_Change_Btn') //修改头像按钮
        const Avatar_Form = document.querySelector('.ShowSpecific .MyInfo .Avatar_Div form')
        const Avatar_Hidden = document.querySelector('.ShowSpecific .MyInfo .Avatar_Div form input[type="hidden"]')

        //弹出框确认事件
        Alert_Btn.addEventListener('click',function ()
        {
            Alert.style.display = 'none'
            if (AlertType === 1)     //获取新的用户信息
            {
                axios.get(`/Space/${userData.userId}`).then(result=>{
                    data = result.data.data
                }).finally(()=>{
                        sessionStorage.setItem("user",JSON.stringify(data))
                        window.location.href = 'space.html'
                    }
                )
            }else if (AlertType === 2)   //获取新的资源信息(资源管理)
            {
                window.location.href = 'space.html'
            }
        })

        //设置非管理员不可见
        if (userData.identity !== 1)
        {
            SpaceNavigate_ArrLi[3].style.display = 'none'
        }

        //切换不同导航栏展示小页面的更新函数
        function updateNavigate()
        {
            for (let i = 0; i < SpaceNavigate_ArrLi.length; i++)
            {
                if (i === SpaceNavigateNum - 1)
                {
                    SpaceNavigate_ArrLi[i].style.pointerEvents = 'none'
                }else
                {
                    SpaceNavigate_ArrLi[i].style.pointerEvents = 'auto'
                }
            }
            if (SpaceNavigateNum === 1)
            {
                Specific_MyInfo.style.display = 'block'
                Specific_MyFavorite.style.display = 'none'
                Specific_AccountManage.style.display = 'none'
                Specific_ResourceManage.style.display = 'none'
            }else if (SpaceNavigateNum === 2)
            {
                Specific_MyInfo.style.display = 'none'
                Specific_MyFavorite.style.display = 'block'
                Specific_AccountManage.style.display = 'none'
                Specific_ResourceManage.style.display = 'none'
            }else if (SpaceNavigateNum === 3)
            {
                Specific_MyInfo.style.display = 'none'
                Specific_MyFavorite.style.display = 'none'
                Specific_AccountManage.style.display = 'block'
                Specific_ResourceManage.style.display = 'none'
            }else if (SpaceNavigateNum === 4)
            {
                Specific_MyInfo.style.display = 'none'
                Specific_MyFavorite.style.display = 'none'
                Specific_AccountManage.style.display = 'none'
                Specific_ResourceManage.style.display = 'block'
            }
        }

        updateNavigate()

        //设置TotalInfo中头像昵称等信息
        TotalInfo_avatar.src = userData.avatar
        TotalInfo_nickName.innerHTML = `${userData.nickname}`
        TotalInfo_userName.innerHTML = `用户名: ${userData.userName}`
        //设置收藏数量和评论数量
        axios.get(`/Space/getFavoriteNum?userId=${userData.userId}`).then(result=>{
            TotalInfo_span_favorite.innerHTML = result.data.data
        })
        axios.get(`/Space/getCommentNum?userId=${userData.userId}`).then(result=>{
            TotalInfo_span_comment.innerHTML = result.data.data
        })

        //侧边导航栏Li鼠标进入和点击事件样式改变
        for (let i = 0; i < SpaceNavigate_ArrLi.length; i++)
        {
            SpaceNavigate_ArrLi[i].addEventListener('click',function ()
            {
                const LastActive = document.querySelector('.SpaceNavigate ul .active')
                LastActive.classList.remove('active')
                SpaceNavigate_ArrLi[i].classList.add('active')
                SpaceNavigateNum = i + 1
                updateNavigate()
            })
            SpaceNavigate_ArrLi[i].addEventListener('mouseenter',function ()
            {
                if (SpaceNavigate_ArrLi[i].className.indexOf('active') < 0)
                {
                    SpaceNavigate_ArrLi[i].classList.add('moveIn')
                }
            })
            SpaceNavigate_ArrLi[i].addEventListener('mouseleave',function ()
            {
                if (SpaceNavigate_ArrLi[i].className.indexOf('moveIn') > -1)
                {
                    SpaceNavigate_ArrLi[i].classList.remove('moveIn')
                }
            })
        }

        //初始化昵称
        ChangeNickName_Input.value = userData.nickname

        //修改昵称按钮
        ChangeNickName_Btn.addEventListener('click',function (){
            let newNickName = ChangeNickName_Input.value
            let isOk = 1
            if (newNickName === '')
            {
                ChangeNickName_Err.innerHTML = '昵称不能为空且不能存在空格'
                ChangeNickName_Err.style.display = 'block'
                isOk = 0
            }else if (newNickName === userData.nickname)
            {
                ChangeNickName_Err.innerHTML = '不能与之前的昵称相同'
                ChangeNickName_Err.style.display = 'block'
                isOk = 0
            }
            for (let i = 0; i < newNickName.length; i++)
            {
                if (newNickName.charAt(i) === ' ')
                {
                    ChangeNickName_Err.innerHTML = '昵称不能为空且不能存在空格'
                    ChangeNickName_Err.style.display = 'block'
                    isOk = 0
                }
            }
            if (isOk === 1)
            {
                ChangeNickName_Err.style.display = 'none'
                axios.get(`/Space/ChangeNickname?userId=${userData.userId}&newNickname=${newNickName}`).then(result=>{
                    if (result.data.code === 1)
                    {
                        AlertType = 1
                        Alert_Content.innerHTML = '昵称修改成功!'
                        Alert.style.display = 'block'
                    }
                })
            }
        })

        //设置默认头像
        Avatar_Upload_Img.src = userData.avatar

        //未选择头像前按钮不可点击
        Avatar_Change_Btn.disabled = true
        Avatar_Hidden.value = userData.userId

        //上传头像按钮
        Avatar_Upload_Btn.addEventListener('click',function ()
        {
            Avatar_Upload_File.click()
        })
        let reader = new FileReader() //文件阅读器
        let file                                //上传文件
        Avatar_Upload_File.addEventListener('change',function (e)
        {
            Avatar_Change_Btn.style.background = '#00a1d6'
            Avatar_Change_Btn.style.color = '#ffffff'
            Avatar_Change_Btn.disabled = false
            file = this.files[0]
            switch (file.type){
                case 'image/jpg':
                case 'image/png':
                case 'image/jpeg':
                case 'image/gif':
                reader.readAsDataURL(file);
                break;
            }
        })
        reader.addEventListener('load',function ()
        {
            switch (file.type){
                case 'image/jpg':
                    Avatar_Upload_Img.src = reader.result
                    break
                case 'image/png':
                    Avatar_Upload_Img.src = reader.result
                    break
                case 'image/jpeg':
                    Avatar_Upload_Img.src = reader.result
                    break
                case 'image/gif':
                    Avatar_Upload_Img.src = reader.result
                    break
            }
        })
        Avatar_Upload_Img.src = userData.avatar
        //将图片上传数据库并改变用户头像地址
        Avatar_Change_Btn.addEventListener('click',function (e)
        {
            e.preventDefault()
            if (confirm("你确定要修改头像吗？"))
            {
                Avatar_Form.submit()
                Alert_Content.innerHTML = '修改头像成功!!'
                Alert.style.display = 'block'
                AlertType = 1
            }
        })

//我的收藏---------------------------------------------------------------------------
        //初始化内容
        let MyFavorite_ResourceType = 1 //初始为1(1为电影,2为图书)
        let FilmPage = 1  //默认页数
        let BookPage = 1  //默认页数
        let MaxFilmPage           //电影最大页数
        let MaxBookPage           //图书最大页数
        //获取标签
        const MyFavorite_FilmBtn = document.querySelector('.ShowSpecific .MyFavorite .MyFavorite_Logo .MyFavorite_ChooseType .MyFavorite_Film') //分类电影按钮
        const MyFavorite_BookBtn = document.querySelector('.ShowSpecific .MyFavorite .MyFavorite_Logo .MyFavorite_ChooseType .MyFavorite_Book') //分类图书按钮
        const MyFavorite_LastPage = document.querySelector('.ShowSpecific .MyFavorite .MyFavorite_ChangePage .MyFavorite_OperatePage .MyFavorite_LastPage') //上一页按钮
        const MyFavorite_NextPage = document.querySelector('.ShowSpecific .MyFavorite .MyFavorite_ChangePage .MyFavorite_OperatePage .MyFavorite_NextPage') //下一页按钮
        const MyFavorite_TotalResourceNum = document.querySelector('.ShowSpecific .MyFavorite .MyFavorite_ChangePage .MyFavorite_TotalPage .MyFavorite_ResourceNum') //总的数据数量
        const MyFavorite_TotalPageNum = document.querySelector('.ShowSpecific .MyFavorite .MyFavorite_ChangePage .MyFavorite_TotalPage .MyFavorite_ResourcePage') //总的页数数量
        const MyFavorite_NowPage = document.querySelector('.ShowSpecific .MyFavorite .MyFavorite_ChangePage .MyFavorite_OperatePage .MyFavorite_NowPage') //当前页数
        const MyFavorite_ul = document.querySelector('.ShowSpecific .MyFavorite .MyFavorite_ShowLis') //ul
        const MyFavorite_Nothing = document.querySelector('.ShowSpecific .MyFavorite .MyFavorite_Nothing') //为空时展示
        const MyFavorite_FootPage = document.querySelector('.ShowSpecific .MyFavorite .MyFavorite_ChangePage') //空的时候隐藏
        //更新数据
        function MyFavorite_Update() //如果没有数据,设置MyFavorite_Nothing的可见性和ul的可见性
        {
            if (MyFavorite_ResourceType === 1) //获取电影数据
            {
                MyFavorite_NowPage.innerHTML = `当前页数:${FilmPage}`
                axios.get(`Space/getFavoriteFilmNum?userId=${userData.userId}`).then(result=>{
                    if (result.data.data === 0)
                    {
                        MyFavorite_ul.style.display = 'none'
                        MyFavorite_FootPage.style.display = 'none'
                        MyFavorite_Nothing.style.display = 'block'
                    }else
                    {
                        MyFavorite_ul.style.display = 'block'
                        MyFavorite_FootPage.style.display = 'block'
                        MyFavorite_Nothing.style.display = 'none'
                        MyFavorite_TotalResourceNum.innerHTML = `共有${result.data.data}条数据`
                        MaxFilmPage = Math.ceil(result.data.data / 3)
                        MyFavorite_TotalPageNum.innerHTML = `总计${MaxFilmPage}页`
                        //获取数据在ul添加li(axios)
                        let FilmData
                        axios.get(`Space/getMyFavoriteFilms?userId=${userData.userId}&FilmPage=${FilmPage}`).then(result=>{
                            FilmData = result.data.data
                        }).finally(()=>{
                            MyFavorite_ul.innerHTML = ''
                            for (let i = 0; i < FilmData.length; i++)
                            {
                                let favoriteDate = FilmData[i].favoriteDate
                                let li = document.createElement('li')
                                li.innerHTML = `
                                <a href="#">
                                    <img src="${FilmData[i].filmImg}" alt="">
                                </a>
                                <p>${FilmData[i].filmName}</p>
                                <i>收藏于: <span>${favoriteDate.substring(0,10)}</span></i>`
                                MyFavorite_ul.appendChild(li)
                                li.addEventListener('click',function ()
                                {
                                    sessionStorage.setItem("classify","Film")
                                    sessionStorage.setItem("resourceId",FilmData[i].filmId)
                                    window.location.href = "detailstage.html"
                                })
                            }
                        })
                    }
                })
            }else if (MyFavorite_ResourceType === 2) //获取图书数据
            {
                MyFavorite_NowPage.innerHTML = `当前页数:${BookPage}`
                axios.get(`Space/getFavoriteBookNum?userId=${userData.userId}`).then(result=>{
                    if (result.data.data === 0)
                    {
                        MyFavorite_ul.style.display = 'none'
                        MyFavorite_FootPage.style.display = 'none'
                        MyFavorite_Nothing.style.display = 'block'
                    }else
                    {
                        MyFavorite_ul.style.display = 'block'
                        MyFavorite_FootPage.style.display = 'block'
                        MyFavorite_Nothing.style.display = 'none'
                        MyFavorite_TotalResourceNum.innerHTML = `共有${result.data.data}条数据`
                        MaxBookPage = Math.ceil(result.data.data / 3)
                        MyFavorite_TotalPageNum.innerHTML = `总计${MaxBookPage}页`
                        //获取数据在ul添加li(axios)
                        let BookData
                        axios.get(`/Space/getMyFavoriteBooks?userId=${userData.userId}&BookPage=${BookPage}`).then(result=>{
                            BookData = result.data.data
                            console.log(BookData)
                        }).finally(()=>{
                            MyFavorite_ul.innerHTML = ''
                            for (let i = 0; i < BookData.length; i++)
                            {
                                let favoriteDate = BookData[i].favoriteDate
                                let li = document.createElement('li')
                                li.innerHTML =  `
                                <a href="#">
                                    <img src="${BookData[i].bookImg}" alt="">
                                </a>
                                <p>${BookData[i].bookName}</p>
                                <i>收藏于: <span>${favoriteDate.substring(0,10)}</span></i>`
                                MyFavorite_ul.appendChild(li)
                                li.addEventListener('click',function ()
                                {
                                    sessionStorage.setItem("classify","Book")
                                    sessionStorage.setItem("resourceId",BookData[i].bookId)
                                    window.location.href = "detailstage.html"
                                })
                            }
                        })
                    }
                })
            }
        }
        //初始更新数据
        MyFavorite_Update()

        //切换收藏类型事件
        MyFavorite_FilmBtn.addEventListener('click',function (e)
        {
            e.preventDefault()
            if (MyFavorite_ResourceType === 2)
            {
                MyFavorite_ResourceType = 1
                FilmPage = 1
                MyFavorite_Update()
            }
        })

        MyFavorite_BookBtn.addEventListener('click',function (e)
        {
            e.preventDefault()
            if (MyFavorite_ResourceType === 1)
            {
                MyFavorite_ResourceType = 2
                BookPage = 1
                MyFavorite_Update()
            }
        })

        //切换页数操作
        MyFavorite_LastPage.addEventListener('click',function (e)
        {
            e.preventDefault()
            if (MyFavorite_ResourceType === 1)
            {
                if (FilmPage > 1)
                {
                    FilmPage -= 1
                    MyFavorite_Update()
                }
            }else if (MyFavorite_ResourceType === 2)
            {
                if (BookPage > 1)
                {
                    BookPage -= 1
                    MyFavorite_Update()
                }
            }
        })

        MyFavorite_NextPage.addEventListener('click',function (e)
        {
            e.preventDefault()
            if (MyFavorite_ResourceType === 1)
            {
                if (FilmPage < MaxFilmPage)
                {
                    FilmPage += 1
                    MyFavorite_Update()
                }
            }else if (MyFavorite_ResourceType === 2)
            {
                if (BookPage < MaxBookPage)
                {
                    BookPage += 1
                    MyFavorite_Update()
                }
            }
        })

//账号管理(修改密保)---------------------------------------------------------------------------
        //获取标签
        const AccountManage_Question = document.querySelector('.ShowSpecific .AccountManage .AccountManage_Question') //密保问题
        const AccountManage_Answer = document.querySelector('.ShowSpecific .AccountManage .AccountManage_Answer')     //密保输入框
        const AccountManage_Error = document.querySelector('.ShowSpecific .AccountManage .AccountManage_Error')       //错误信息
        const AccountManage_GoChangePageBtn = document.querySelector('.ShowSpecific .AccountManage .AccountManage_GoChangePageBtn') //前往更新界面按钮
        const AccountManage_ChangeDiv = document.querySelector('.ShowSpecific .AccountManage_ChangeDiv') //修改界面
        const AccountManage_ChooseQuestion = document.querySelector('.ShowSpecific .AccountManage_ChangeDiv .AccountManage_DecorateDiv .AccountManage_ChooseQuestion') //问题选择框
        const AccountManage_DefineQuestion = document.querySelector('.ShowSpecific .AccountManage_ChangeDiv .AccountManage_DecorateDiv .AccountManage_DefineQuestion') //自定义问题框
        const AccountManage_newAnswer = document.querySelector('.ShowSpecific .AccountManage_ChangeDiv .AccountManage_DecorateDiv .AccountManage_newAnswer')  //答案输入框
        const AccountManage_ConfirmChangeBtn = document.querySelector('.ShowSpecific .AccountManage_ChangeDiv .AccountManage_DecorateDiv .AccountManage_ConfirmChangeBtn') //确认修改按钮
        const AccountManage_ExitChangeBtn = document.querySelector('.ShowSpecific .AccountManage_ChangeDiv .AccountManage_DecorateDiv .AccountManage_ExitChangeBtn') //退出修改按钮
        const AccountManage_ChangeError = document.querySelector('.ShowSpecific .AccountManage_ChangeDiv .AccountManage_DecorateDiv .AccountManage_ChangeError') //修改密保错误


        //初始化内容(问题)
        AccountManage_Question.innerHTML = `问题:${userData.question}`
        AccountManage_GoChangePageBtn.disabled = true

        //输入框input事件改变按钮样式
        AccountManage_Answer.addEventListener('input',function ()
        {
            if (AccountManage_Answer.value !== '')
            {
                AccountManage_GoChangePageBtn.disabled = false
                AccountManage_GoChangePageBtn.style.background = '#00a1d6'
                AccountManage_GoChangePageBtn.style.color = '#ffffff'
            }else
            {
                AccountManage_GoChangePageBtn.disabled = true
                AccountManage_GoChangePageBtn.style.background = 'rgb(244,245,247)'
                AccountManage_GoChangePageBtn.style.color = 'rgb(222,215,215)'
            }
        })

        //前往修改界面按钮点击事件
        AccountManage_GoChangePageBtn.addEventListener('click',function ()
        {
            if (AccountManage_Answer.value === userData.answer)
            {
                AccountManage_Error.style.display = 'none'
                AccountManage_Answer.value = ''
                AccountManage_ChangeDiv.style.display = 'block'
            }else{
                AccountManage_Error.style.display = 'block'
                AccountManage_Answer.value = ''
            }
        })

        //select切换显示自定义问题事件
        AccountManage_ChooseQuestion.addEventListener('change',function ()
        {
            if (AccountManage_ChooseQuestion.value === '自定义问题')
            {
                AccountManage_DefineQuestion.style.display = 'block'
            }else
            {
                AccountManage_DefineQuestion.style.display = 'none'
            }
        })
        function AccountManage_clearContent()
        {
            AccountManage_ChooseQuestion.value = ''
            AccountManage_DefineQuestion.value = ''
            AccountManage_newAnswer.value = ''
        }
        //退出按钮事件
        AccountManage_ExitChangeBtn.addEventListener('click',function ()
        {
            AccountManage_clearContent()
            AccountManage_ChangeDiv.style.display = 'none'
        })

        //确认修改事件
        AccountManage_ConfirmChangeBtn.addEventListener('click',function ()
        {
            let Account_ChangeJudge = 1
            if (AccountManage_ChooseQuestion.value === '')
            {
                AccountManage_ChangeError.innerHTML = '请选择一个问题'
                AccountManage_ChangeError.style.display = 'block'
                Account_ChangeJudge = 0
            }else if (AccountManage_ChooseQuestion.value === '自定义问题')
            {
                if (AccountManage_DefineQuestion.value === '')
                {
                    AccountManage_ChangeError.innerHTML = '请输入自定义问题'
                    AccountManage_ChangeError.style.display = 'block'
                    Account_ChangeJudge = 0
                }else{
                    for (let i = 0; i < AccountManage_DefineQuestion.value.length; i++)
                    {
                        if (AccountManage_DefineQuestion.value.charAt(i) === ' ')
                        {
                            AccountManage_ChangeError.innerHTML = '自定义问题中不能含有空格'
                            AccountManage_ChangeError.style.display = 'block'
                            Account_ChangeJudge = 0
                            break
                        }
                    }
                }
            }
            if (Account_ChangeJudge === 1)
            {
                if (AccountManage_newAnswer.value === '')
                {
                    AccountManage_ChangeError.innerHTML = '答案不能为空'
                    AccountManage_ChangeError.style.display = 'block'
                    Account_ChangeJudge = 0
                }else
                {
                    for (let i = 0; i < AccountManage_newAnswer.value.length; i++)
                    {
                        if (AccountManage_newAnswer.value.charAt(i) === ' ')
                        {
                            AccountManage_ChangeError.innerHTML = '答案不能有空格'
                            AccountManage_ChangeError.style.display = 'block'
                            Account_ChangeJudge = 0
                        }
                    }
                }
            }
            if (Account_ChangeJudge === 1)
            {
                AccountManage_ChangeError.style.display = 'none'
                let newQuestion
                let newAnswer = AccountManage_newAnswer.value
                if (AccountManage_ChooseQuestion.value === '自定义问题')
                {
                    newQuestion = AccountManage_DefineQuestion.value
                }else
                {
                    newQuestion = AccountManage_ChooseQuestion.value
                }
                axios.get(`/Space/ChangeQuestion?newQuestion=${newQuestion}&newAnswer=${newAnswer}&userId=${userData.userId}`).then(result=>{
                    AccountManage_clearContent()
                    AlertType = 1
                    Alert_Content.innerHTML = '修改密保成功'
                    Alert.style.display = 'block'
                })
            }
        })

//资源管理---------------------------------------------------------------------------
        //基础信息
        let ResourceManage_Type = 1 //管理的资源类型(根据这个重新获取对应的资源,1为电影,2为图书)
        let ResourceManage_FilmPage = 1 //电影初始页面数
        let ResourceManage_BookPage = 1 //图书初始页面数
        let ResourceManage_MaxFilmPage          //电影最高页数
        let ResourceManage_MaxBookPage          //图书最高页数
        let resourceMaintain_ChooseType = 0 //点击图书类型  (更新信息使用)
        let resourceMaintain_resourceId = 0 //资源Id       (更新信息使用)

        //获取元素
        const ResourceManage_Upload = document.querySelector('.ShowSpecific .ResourceManage .ResourceManage_Logo input[type="button"]') //上传资料按钮
        const ResourceManage_FilmType = document.querySelector('.ShowSpecific .ResourceManage .ResourceManage_Logo .ResourceManage_Logo_Type .ResourceManage_Logo_Film') //切换电影类型
        const ResourceManage_BookType = document.querySelector('.ShowSpecific .ResourceManage .ResourceManage_Logo .ResourceManage_Logo_Type .ResourceManage_Logo_Book') //切换图书类型
        const ResourceManage_LastPage = document.querySelector('.ShowSpecific .ResourceManage .ResourceManage_FootPage .ResourceManage_OperatePage .ResourceManage_LastPage') //上一页按钮
        const ResourceManage_NextPage = document.querySelector('.ShowSpecific .ResourceManage .ResourceManage_FootPage .ResourceManage_OperatePage .ResourceManage_NextPage') //下一页按钮
        const ResourceManage_ul = document.querySelector('.ShowSpecific .ResourceManage .ResourceManage_ul') //ul
        const ResourceManage_TotalPage = document.querySelector('.ShowSpecific .ResourceManage .ResourceManage_FootPage .ResourceManage_TotalPage .ResourceManage_ResourcePage')  //总页数
        const ResourceManage_TotalNum = document.querySelector('.ShowSpecific .ResourceManage .ResourceManage_FootPage .ResourceManage_ResourceNum') //资源总数目
        const ResourceManage_NowPage = document.querySelector('.ShowSpecific .ResourceManage .ResourceManage_FootPage .ResourceManage_OperatePage .ResourceManage_NowPage') //当前页数
        const ResourceManage_Foot = document.querySelector('.ShowSpecific .ResourceManage .ResourceManage_FootPage') //底边栏
        const ResourceMaintain_MainPage = document.querySelector('.ShowSpecific .ResourceMaintain')  //维护功能页面
        //更新函数
        function ResourceManage_Update() //如果没有数据,设置MyFavorite_Nothing的可见性和ul的可见性
        {
            if (ResourceManage_Type === 1) //获取电影数据
            {
                ResourceManage_NowPage.innerHTML = `当前页数:${ResourceManage_FilmPage}`
                axios.get(`Space/getAllFilmNum`).then(result => {
                    if (result.data.data === 0) {
                        ResourceManage_Foot.style.display = 'none'
                    } else {
                        ResourceManage_Foot.style.display = 'block'
                        ResourceManage_TotalNum.innerHTML = `共有${result.data.data}条数据`
                        ResourceManage_MaxFilmPage = Math.ceil(result.data.data / 3)
                        ResourceManage_TotalPage.innerHTML = `总计${ResourceManage_MaxFilmPage}页`
                        //获取数据在ul添加li(axios)
                        let ResourceManage_FilmData
                        axios.get(`Space/getAllFilm?FilmPage=${ResourceManage_FilmPage}`).then(result => {
                            ResourceManage_FilmData = result.data.data
                        }).finally(() => {
                            ResourceManage_ul.innerHTML = ''
                            for (let i = 0; i < ResourceManage_FilmData.length; i++) {
                                let ResourceManage_li = document.createElement('li')
                                ResourceManage_li.innerHTML = `
                                <a href="#">
                                    <img src="${ResourceManage_FilmData[i].filmImg}" alt="">
                                </a>
                                <p>${ResourceManage_FilmData[i].filmName}</p>
                                <i>上传于: <span>${ResourceManage_FilmData[i].uploadDate.substring(0, 10)}</span></i>`
                                ResourceManage_ul.appendChild(ResourceManage_li)
                                ResourceManage_li.addEventListener('click', function () {
                                    resourceMaintain_ChooseType = 1  //电影
                                    resourceMaintain_resourceId = ResourceManage_FilmData[i].filmId
                                    ResourceMaintain_MainPage.style.display = 'block'
                                })
                            }
                        })
                    }
                })
            } else if (ResourceManage_Type === 2) //获取图书数据
            {
                ResourceManage_NowPage.innerHTML = `当前页数:${ResourceManage_BookPage}`
                axios.get(`Space/getAllBookNum`).then(result => {
                    if (result.data.data === 0) {
                        ResourceManage_Foot.style.display = 'none'
                    } else {
                        ResourceManage_Foot.style.display = 'block'
                        ResourceManage_TotalNum.innerHTML = `共有${result.data.data}条数据`
                        ResourceManage_MaxBookPage = Math.ceil(result.data.data / 3)
                        ResourceManage_TotalPage.innerHTML = `总计${ResourceManage_MaxBookPage}页`
                        //获取数据在ul添加li(axios)
                        let ResourceManage_BookData
                        axios.get(`/Space/getAllBook?BookPage=${ResourceManage_BookPage}`).then(result => {
                            ResourceManage_BookData = result.data.data
                        }).finally(() => {
                            ResourceManage_ul.innerHTML = ''
                            for (let i = 0; i < ResourceManage_BookData.length; i++) {
                                let ResourceManage_li = document.createElement('li')
                                ResourceManage_li.innerHTML = `
                                    <a href="#">
                                        <img src="${ResourceManage_BookData[i].bookImg}" alt="">
                                    </a>
                                    <p>${ResourceManage_BookData[i].bookName}</p>
                                    <i>上传于: <span>${ResourceManage_BookData[i].uploadDate.substring(0, 10)}</span></i>`
                                ResourceManage_ul.appendChild(ResourceManage_li)

                                ResourceManage_li.addEventListener('click', function () {
                                    resourceMaintain_ChooseType = 2 //图片
                                    resourceMaintain_resourceId = ResourceManage_BookData[i].bookId
                                    ResourceMaintain_MainPage.style.display = 'block'
                                })
                            }
                        })
                    }
                })
            }
        }

        //初始化更新
        ResourceManage_Update()

        //切换收藏类型事件
        ResourceManage_FilmType.addEventListener('click',function (e)
        {
            e.preventDefault()
            if (ResourceManage_Type === 2)
            {
                ResourceManage_Type = 1
                ResourceManage_FilmPage = 1
                ResourceManage_Update()
            }
        })

        ResourceManage_BookType.addEventListener('click',function (e)
        {
            e.preventDefault()
            if (ResourceManage_Type === 1)
            {
                ResourceManage_Type = 2
                ResourceManage_BookPage = 1
                ResourceManage_Update()
            }
        })

        //切换页数操作
        ResourceManage_LastPage.addEventListener('click',function (e)
        {
            e.preventDefault()
            if (ResourceManage_Type === 1)
            {
                if (ResourceManage_FilmPage > 1)
                {
                    ResourceManage_FilmPage -= 1
                    ResourceManage_Update()
                }
            }else if (ResourceManage_Type === 2)
            {
                if (ResourceManage_BookPage > 1)
                {
                    ResourceManage_BookPage -= 1
                    ResourceManage_Update()
                }
            }
        })

        ResourceManage_NextPage.addEventListener('click',function (e)
        {
            e.preventDefault()
            if (ResourceManage_Type === 1)
            {
                if (ResourceManage_FilmPage < ResourceManage_MaxFilmPage)
                {
                    ResourceManage_FilmPage += 1
                    ResourceManage_Update()
                }
            }else if (ResourceManage_Type === 2)
            {
                if (ResourceManage_BookPage < ResourceManage_MaxBookPage)
                {
                    ResourceManage_BookPage += 1
                    ResourceManage_Update()
                }
            }
        })

//上传文件--------------------------------------------------------------------
        //获取上传文件相关元素
        const resource_upload_MainPage = document.querySelector('.ShowSpecific .ResourceUpload') //上传页面
        const resource_upload_Img = document.querySelector('.ShowSpecific .ResourceUpload .ResourceUpload_Main .ResourceUpload_Img img')                           //显示图片
        const resource_upload_ChooseFile = document.querySelector('.ShowSpecific .ResourceUpload .ResourceUpload_Main .ResourceUpload_Img input[type="file"]')     //文件按钮
        const resource_upload_Error = document.querySelector('.ShowSpecific .ResourceUpload .ResourceUpload_Main .ResourceUpload_Logo .ResourceManage_Logo_Error') //错误提示框
        const resource_upload_Name = document.querySelector('.ShowSpecific .ResourceUpload .ResourceUpload_Main .ResourceUpload_Info .ResourceUpload_Name')        //作品名称
        const resource_upload_Writer = document.querySelector('.ShowSpecific .ResourceUpload .ResourceUpload_Main .ResourceUpload_Info .ResourceUpload_Writer')    //作者名称
        const resource_upload_publishDate = document.querySelector('.ShowSpecific .ResourceUpload .ResourceUpload_Main .ResourceUpload_Info .ResourceUpload_publishDate') //出版时间
        const resource_upload_url = document.querySelector('.ShowSpecific .ResourceUpload .ResourceUpload_Main .ResourceUpload_Info .ResourceUpload_url')           //作品url
        const resource_upload_ISBN = document.querySelector('.ShowSpecific .ResourceUpload .ResourceUpload_Main .ResourceUpload_Info .ResourceUpload_ISBN')         //图书ISBN
        const resource_upload_introduce = document.querySelector('.ShowSpecific .ResourceUpload .ResourceUpload_Main .ResourceUpload_Info .ResourceUpload_Introduce') //作品简介
        const resource_upload_chooseType = document.querySelector('.ShowSpecific .ResourceUpload .ResourceUpload_Main .ResourceUpload_Logo .ResourceUpload_selectType') //所选择作品类型
        const resource_upload_ConfirmBtn = document.querySelector('.ShowSpecific .ResourceUpload .ResourceUpload_Main .ResourceUpload_Info .ResourceUpload_confirmBtn') //上传按钮
        const resource_upload_ExitBtn = document.querySelector('.ShowSpecific .ResourceUpload .ResourceUpload_Main .ResourceUpload_Info .ResourceUpload_ExitBtn')       //退出按钮
        const resource_upload_form = document.querySelector('.ShowSpecific .ResourceUpload .ResourceUpload_Main form')                                                  //form表单

        //上传资料按钮
        ResourceManage_Upload.addEventListener('click',function ()
        {
            resource_upload_MainPage.style.display = 'block'
        })

        function clearAllContent()
        {
            resource_upload_Error.style.display = 'none'
            resource_upload_Img.src = 'img/Space/uploadDefault.jpg'
            resource_upload_ChooseFile.value = ''
            resource_upload_Name.value = ''
            resource_upload_Writer.value = ''
            resource_upload_publishDate.value = ''
            resource_upload_url.value = ''
            resource_upload_ISBN.value = ''
            resource_upload_introduce.value = ''
        }

        //类型切换显示ISBN
        resource_upload_chooseType.addEventListener('change',function ()
        {
            clearAllContent()
            if (resource_upload_chooseType.value === 'Film')
            {
                resource_upload_ISBN.style.display = 'none'
            }else if (resource_upload_chooseType.value === 'Book')
            {
                resource_upload_ISBN.style.display = 'inline-block'
            }
        })

        //退出按钮
        resource_upload_ExitBtn.addEventListener('click',function ()
        {
            //设置所有值为空
            clearAllContent()
            resource_upload_chooseType.value = 'Film'
            resource_upload_MainPage.style.display = 'none'
        })

        //确认上传按钮
        resource_upload_ConfirmBtn.addEventListener('click',function ()
        {
            if (resource_upload_ChooseFile.value === '')
            {
                resource_upload_Error.innerHTML = '请选择一个图片'
                resource_upload_Error.style.display = 'block'
            }else if (resource_upload_chooseType.value === '')
            {
                resource_upload_Error.innerHTML = '请选择一种类型上传'
                resource_upload_Error.style.display = 'block'
            }else if (resource_upload_Name.value === '')
            {
                resource_upload_Error.innerHTML = '作品名称不能为空'
                resource_upload_Error.style.display = 'block'
            }else if (resource_upload_Writer.value === '')
            {
                resource_upload_Error.innerHTML = '作者名称不能为空'
                resource_upload_Error.style.display = 'block'
            }else if (resource_upload_publishDate.value === '')
            {
                resource_upload_Error.innerHTML = '出版时间不能为空'
                resource_upload_Error.style.display = 'block'
            }else if (resource_upload_url.value === '')
            {
                resource_upload_Error.innerHTML = '作品url不能为空'
                resource_upload_Error.style.display = 'block'
            }else if (resource_upload_ISBN.value === '' && resource_upload_chooseType.value === 'Book')
            {
                resource_upload_Error.innerHTML = 'ISBN不能为空'
                resource_upload_Error.style.display = 'block'
            }else if (resource_upload_introduce.value === '')
            {
                resource_upload_Error.innerHTML = '作品简介不能为空'
                resource_upload_Error.style.display = 'block'
            }else
            {
                resource_upload_Error.style.display = 'none'
                //使form提交(新增作品)
                if (resource_upload_chooseType.value === 'Film')
                {
                    resource_upload_form.action = 'Space/uploadFilmResource'
                }else if (resource_upload_chooseType.value === 'Book')
                {
                    resource_upload_form.action = 'Space/uploadBookResource'
                }
                resource_upload_form.submit()
                Alert_Content.innerHTML = '上传资源成功!'
                Alert.style.display = 'block'
                AlertType = 2
            }
        })

        //图片回写事件
        resource_upload_ChooseFile.addEventListener('change',function (e)
        {
            if (resource_upload_ChooseFile.value !== '')
            {
                let upload_reader = new FileReader() //文件阅读器
                let upload_file                                //上传文件
                upload_file = this.files[0]
                switch (upload_file.type){
                    case 'image/jpg':
                    case 'image/png':
                    case 'image/jpeg':
                    case 'image/gif':
                        upload_reader.readAsDataURL(upload_file);
                        break;
                }
                upload_reader.addEventListener('load',function ()
                {
                    switch (upload_file.type){
                        case 'image/jpg':
                            resource_upload_Img.src = upload_reader.result
                            break
                        case 'image/png':
                            resource_upload_Img.src = upload_reader.result
                            break
                        case 'image/jpeg':
                            resource_upload_Img.src = upload_reader.result
                            break
                        case 'image/gif':
                            resource_upload_Img.src = upload_reader.result
                            break
                    }
                })
            }else
            {
                resource_upload_Img.src = 'img/Space/uploadDefault.jpg'
            }
        })
//维护资源------------------------------------------------------------------------------------
        //获取元素
        const ResourceMaintain_ChangeImgBtn = document.querySelector('.ShowSpecific .ResourceMaintain .ResourceMaintain_ChooseFunc .ResourceMaintain_ChangeImgBtn') //修改图片按钮
        const ResourceMaintain_ChangeInfoBTn = document.querySelector('.ShowSpecific .ResourceMaintain .ResourceMaintain_ChooseFunc .ResourceMaintain_ChangeInfoBtn') //修改信息按钮
        const ResourceMaintain_DelResourceBtn = document.querySelector('.ShowSpecific .ResourceMaintain .ResourceMaintain_ChooseFunc .ResourceMaintain_DelResourceBtn') //删除资源按钮
        const ResourceMaintain_ExitBtn = document.querySelector('.ShowSpecific .ResourceMaintain .ResourceMaintain_ChooseFunc .ResourceMaintain_ExitBtn') //退出按钮
        const ResourceMaintain_maintainImg_ShowImg = document.querySelector('.ShowSpecific .ResourceMaintain .ResourceMaintain_maintainImg .ResourceMaintain_maintainImg_showImg') //修改图片的预览图片
        const ResourceMaintain_maintainImg_ChooseFile = document.querySelector('.ShowSpecific .ResourceMaintain .ResourceMaintain_maintainImg input[type="file"]') //选择图片按钮
        const ResourceMaintain_maintainImg_MainPage = document.querySelector('.ShowSpecific .ResourceMaintain .ResourceMaintain_maintainImg') //修改图片主界面
        const ResourceMaintain_FuncPage = document.querySelector('.ShowSpecific .ResourceMaintain .ResourceMaintain_ChooseFunc') //按钮界面


        //按钮事件
        //退出界面按钮
        ResourceMaintain_ExitBtn.addEventListener('click',function ()
        {
            ResourceMaintain_MainPage.style.display = 'none'
        })

        //修改图片按钮
        ResourceMaintain_ChangeImgBtn.addEventListener('click',function ()
        {
            ResourceMaintain_maintainImg_MainPage.style.display = 'block'
            ResourceMaintain_FuncPage.style.display = 'none'
        })

//修改图片---------------------
        //获取元素
        const ResourceMaintain_maintainImg_ExitBtn = document.querySelector('.ShowSpecific .ResourceMaintain .ResourceMaintain_maintainImg input[value="退出"]') //退出替换图片按钮
        const ResourceMaintain_maintainImg_ConfirmBtn = document.querySelector('.ShowSpecific .ResourceMaintain .ResourceMaintain_maintainImg input[value="替换"]') //确认替换图片按钮
        const ResourceMaintain_maintainImg_Form = document.querySelector('.ShowSpecific .ResourceMaintain .ResourceMaintain_maintainImg form') //修改图片表单
        const ResourceMaintain_maintainImg_sourceId = document.querySelector('.ShowSpecific .ResourceMaintain .ResourceMaintain_maintainImg input[type="hidden"]')

        //图片回写事件
        ResourceMaintain_maintainImg_ChooseFile.addEventListener('change',function (e)
        {
            if (ResourceMaintain_maintainImg_ChooseFile.value !== '')
            {
                let maintain_reader = new FileReader() //文件阅读器
                let maintain_file                                //上传文件
                maintain_file = this.files[0]
                switch (maintain_file.type){
                    case 'image/jpg':
                    case 'image/png':
                    case 'image/jpeg':
                    case 'image/gif':
                        maintain_reader.readAsDataURL(maintain_file);
                        break;
                }
                maintain_reader.addEventListener('load',function ()
                {
                    switch (maintain_file.type){
                        case 'image/jpg':
                            ResourceMaintain_maintainImg_ShowImg.src = maintain_reader.result
                            break
                        case 'image/png':
                            ResourceMaintain_maintainImg_ShowImg.src = maintain_reader.result
                            break
                        case 'image/jpeg':
                            ResourceMaintain_maintainImg_ShowImg.src = maintain_reader.result
                            break
                        case 'image/gif':
                            ResourceMaintain_maintainImg_ShowImg.src = maintain_reader.result
                            break
                    }
                })
            }else
            {
                ResourceMaintain_maintainImg_ShowImg.src = 'img/Space/uploadDefault.jpg'
            }
        })
        //退出按钮
        ResourceMaintain_maintainImg_ExitBtn.addEventListener('click',function ()
        {
            ResourceMaintain_maintainImg_MainPage.style.display = 'none'
            ResourceMaintain_FuncPage.style.display = 'block'
            //清空file文件
            ResourceMaintain_maintainImg_ChooseFile.value = ''
            ResourceMaintain_maintainImg_ShowImg.src = 'img/Space/uploadDefault.jpg'
        })
        //点击上传图片
        ResourceMaintain_maintainImg_ConfirmBtn.addEventListener('click',function ()
        {
            //确认替换
            if (confirm("你确定替换图片吗?"))
            {
                //替换
                if (resourceMaintain_ChooseType === 1) //更改电影
                {
                    ResourceMaintain_maintainImg_sourceId.value = resourceMaintain_resourceId
                    ResourceMaintain_maintainImg_Form.action = 'Space/MaintainFilmImg'
                    ResourceMaintain_maintainImg_Form.submit()
                    Alert_Content.innerHTML = '替换图片成功!'
                    Alert.style.display = 'block'
                    AlertType = 2
                }else if (resourceMaintain_ChooseType === 2) //更改图书
                {
                    ResourceMaintain_maintainImg_sourceId.value = resourceMaintain_resourceId
                    ResourceMaintain_maintainImg_Form.action = 'Space/MaintainBookImg'
                    ResourceMaintain_maintainImg_Form.submit()
                    Alert_Content.innerHTML = '替换图片成功!'
                    Alert.style.display = 'block'
                    AlertType = 2
                }
            }
        })
//修改信息--------------------------------------------------------------
        const resourceMaintain_maintainInfo_MainPage = document.querySelector('.ShowSpecific .ResourceMaintain .ResourceMaintain_maintainInfo') //修改信息主界面
        const resourceMaintain_maintainInfo_url = document.querySelector('.ShowSpecific .ResourceMaintain .ResourceMaintain_maintainInfo .ResourceMaintain_maintainInfo_URL') //url输入框
        const resourceMaintain_maintainInfo_ISBN = document.querySelector('.ShowSpecific .ResourceMaintain .ResourceMaintain_maintainInfo .ResourceMaintain_maintainInfo_ISBN') //ISBN输入框
        const resourceMaintain_maintainInfo_Introduce = document.querySelector('.ShowSpecific .ResourceMaintain .ResourceMaintain_maintainInfo .ResourceMaintain_maintainInfo_Introduce') //简介输入框
        const resourceMaintain_maintainInfo_Error = document.querySelector('.ShowSpecific .ResourceMaintain .ResourceMaintain_maintainInfo .ResourceMaintain_maintainInfo_Logo i') //错误信息
        const resourceMaintain_maintainInfo_ExitBtn = document.querySelector('.ShowSpecific .ResourceMaintain .ResourceMaintain_maintainInfo input[value="退出"]') //退出按钮
        const resourceMaintain_maintainInfo_ConfirmBtn = document.querySelector('.ShowSpecific .ResourceMaintain .ResourceMaintain_maintainInfo input[value="更新"]') //更新按钮
        //按钮点击事件
        //进入修改信息界面
        ResourceMaintain_ChangeInfoBTn.addEventListener('click',function ()
        {
            if (resourceMaintain_ChooseType === 1)
            {
                axios.get(`/Space/getSingleFilm?resourceId=${resourceMaintain_resourceId}`).then(result=>{
                    resourceMaintain_maintainInfo_url.value = result.data.data.filmUrl
                    resourceMaintain_maintainInfo_Introduce.value = result.data.data.filmSynopsis
                    resourceMaintain_maintainInfo_MainPage.style.display = 'block'
                    ResourceMaintain_FuncPage.style.display = 'none'
                    resourceMaintain_maintainInfo_ISBN.style.display = 'none'
                })
            }else if (resourceMaintain_ChooseType === 2)
            {
                axios.get(`/Space/getSingleBook?resourceId=${resourceMaintain_resourceId}`).then(result=>{
                    resourceMaintain_maintainInfo_url.value = result.data.data.bookUrl
                    resourceMaintain_maintainInfo_ISBN.value = result.data.data.isbn
                    resourceMaintain_maintainInfo_Introduce.value = result.data.data.bookSynopsis
                    resourceMaintain_maintainInfo_MainPage.style.display = 'block'
                    ResourceMaintain_FuncPage.style.display = 'none'
                    resourceMaintain_maintainInfo_ISBN.style.display = 'block'
                })
            }
        })

        //退出按钮
        resourceMaintain_maintainInfo_ExitBtn.addEventListener('click',function ()
        {
            //清理内容
            resourceMaintain_maintainInfo_url.value = ''
            resourceMaintain_maintainInfo_ISBN.value = ''
            resourceMaintain_maintainInfo_Introduce.value = ''
            resourceMaintain_maintainInfo_MainPage.style.display = 'none'
            resourceMaintain_maintainInfo_Error.style.display = 'none'
            ResourceMaintain_FuncPage.style.display = 'block'
        })

        //提交按钮
        resourceMaintain_maintainInfo_ConfirmBtn.addEventListener('click',function ()
        {
            if (confirm("你确定修改信息吗？"))
            {
                //替换
                if (resourceMaintain_ChooseType === 1) //更改电影
                {
                    if (resourceMaintain_maintainInfo_url.value === '')
                    {
                        resourceMaintain_maintainInfo_Error.innerHTML = '作品URL不能为空'
                        resourceMaintain_maintainInfo_Error.style.display = 'inline-block'
                    }else if (resourceMaintain_maintainInfo_Introduce.value === '')
                    {
                        resourceMaintain_maintainInfo_Error.innerHTML = '作品简介不能为空'
                        resourceMaintain_maintainInfo_Error.style.display = 'inline-block'
                    }else
                    {
                        resourceMaintain_maintainInfo_Error.style.display = 'none'
                        axios.get(`/Space/MaintainFilmInfo?url=${resourceMaintain_maintainInfo_url.value}&introduce=${resourceMaintain_maintainInfo_Introduce.value}&resourceId=${resourceMaintain_resourceId}`).then(result=>{
                            if (result.data.code === 1)
                            {
                                Alert_Content.innerHTML = '信息修改成功!'
                                Alert.style.display = 'block'
                                AlertType = 2
                            }
                        })
                    }
                }else if (resourceMaintain_ChooseType === 2) //更改图书
                {
                    if (resourceMaintain_maintainInfo_url.value === '')
                    {
                        resourceMaintain_maintainInfo_Error.innerHTML = '作品URL不能为空'
                        resourceMaintain_maintainInfo_Error.style.display = 'inline-block'
                    }else if (resourceMaintain_maintainInfo_ISBN.value === '')
                    {
                        resourceMaintain_maintainInfo_Error.innerHTML = '图书ISBN不能为空'
                        resourceMaintain_maintainInfo_Error.style.display = 'inline-block'
                    }else if (resourceMaintain_maintainInfo_Introduce.value === '')
                    {
                        resourceMaintain_maintainInfo_Error.innerHTML = '作品简介不能为空'
                        resourceMaintain_maintainInfo_Error.style.display = 'inline-block'
                    }else
                    {
                        resourceMaintain_maintainInfo_Error.style.display = 'none'
                        axios.get(`/Space/MaintainBookInfo?url=${resourceMaintain_maintainInfo_url.value}&ISBN=${resourceMaintain_maintainInfo_ISBN.value}&introduce=${resourceMaintain_maintainInfo_Introduce.value}&resourceId=${resourceMaintain_resourceId}`).then(result=>{
                            if (result.data.code === 1)
                            {
                                Alert_Content.innerHTML = '信息修改成功!'
                                Alert.style.display = 'block'
                                AlertType = 2
                            }
                        })
                    }
                }
            }
        })
//删除资源---------------------------------------------------------------
        ResourceMaintain_DelResourceBtn.addEventListener('click',function ()
        {
            if (confirm("你确定删除该资源吗？"))
            {
                if (resourceMaintain_ChooseType === 1) //删除电影
                {
                    axios.get(`/Space/DelFilm?resourceId=${resourceMaintain_resourceId}`).then(result=>{
                        if (result.data.code === 1)
                        {
                            Alert_Content.innerHTML = '删除资源成功!'
                            Alert.style.display = 'block'
                            AlertType = 2
                        }
                    })
                }else if (resourceMaintain_ChooseType === 2) //删除图书
                {
                    axios.get(`/Space/DelBook?resourceId=${resourceMaintain_resourceId}`).then(result=>{
                        if (result.data.code === 1)
                        {
                            Alert_Content.innerHTML = '删除资源成功!'
                            Alert.style.display = 'block'
                            AlertType = 2
                        }
                    })
                }
            }
        })
    }
})()
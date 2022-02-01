<template>
    <div id="login">
        <div class="login-header">
            <img src="../../assets/logo.svg" alt="eva-pharma logo">
            <p>Sign in to <span>Eva Pharma</span></p>
        </div>
        <form @submit.prevent="login" class="form">
            <p class="error-msg" v-if="error">Incorrect email or password</p>
            <div class="form-group">
                <label for="email">E-mail Address</label>
                <input type="email" placeholder="Email Address" v-model="email" autocomplete="off">
            </div>
            <div class="form-group">
                <label for="password">Password</label>
                <input type="password" placeholder="Password" v-model="password" autocomplete="off">
            </div>
            <div class="form-group">
                <button class="submit-btn" type="submit">Login</button>
            </div>
        </form>
</div>
</template>

<script>
export default {
    name: "Login",

    data() {
        return {
            email: "",
            password: "",
            error:false
        };
    },

    methods: {
        async login() {
            try {
                const {data} = await this.axios.post('/user/login', {
                    Email: this.email,
                    Password: this.password
                });
                this.error = false;
                localStorage.setItem('token', data.token);
                this.$router.push('/');
            } catch (e) {
                // Display error
                this.error = true;
            }
        },
    },
};
</script>

<style lang="scss" scoped>
    #login{
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background: url(../../assets/bg.svg);
        .login-header{
            text-align: center;
            margin-bottom: 25px;
            img{
                width: 100%;
            }
            p{
                font-size: 18px;
                margin-top: 20px;
                margin-bottom: 0;
                color: white;
                span{
                    color: #FFC600;
                    font-weight: bold;
                }
            }
        }
        .form{
            padding: 25px;
            border-radius: 20px;
            background-color: #F8F6F1;
            max-width: 500px;
            width: 90%;
            .error-msg{
                color: #d9534f;
                text-align: center;
                background-color: rgba(217, 83, 79, 0.1);
                padding: 10px;
                border: 1px solid #eee;
                border-left-width: 5px;
                border-left-color: #d9534f;
                border-radius: 10px;
                margin-bottom: 20px;
            }
            .form-group{
                margin-bottom: 20px;
                &:last-child{
                    margin-bottom: unset;
                }
                label{
                    display: block;
                    font-size: 12px;
                    margin-bottom: 5px;
                }
                input{
                    display: block;
                    color: black;
                    width: 100%;
                    height: 40px;
                    border: 1px solid #AFAFAF;
                    outline: unset;
                    font-size: 12px;
                    padding: 0px 3%;
                    border-radius: 10px;
                    background-color: #F8F6F1;
                    transition: all 0.3s;
                    &:focus{
                        border-color: #FFC600;
                        caret-color: #FFC600;
                    }
                }
                .submit-btn{
                    display:block;
                    width: 100px;
                    height: 40px;
                    margin: auto;
                    color: black;
                    border: 1px solid #AFAFAF;
                    cursor: pointer;
                    font-size: 15px;
                    text-align: center;
                    font-weight: bold;
                    border-radius: 4px;
                    background-color: #F8F6F1;
                    transition: all 0.3s;
                    &:hover{
                        background-color: #FFC600;
                        border-color: #FFC600;
                    }
                }
            }
        }
    }
</style>

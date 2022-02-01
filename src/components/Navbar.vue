<template>
    <div v-if="isAuthenticated" class="navbar">
        <div class="navbar-logo">
            <img src="../assets/logo.svg" alt="eva-pharma logo" />
        </div>
        <ul class="navbar-links">
            <li>
                <router-link :to="{ name: 'country' }" active-class="active" exact>Countries</router-link>
            </li>
            <li>
                <router-link :to="{ name: 'city' }" active-class="active">Cities</router-link>
            </li>
            <li>
                <button @click="logout()" class="navbar-logout">Logout</button>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: "navbar",

    computed: {
        isAuthenticated() {
            return !!localStorage.getItem('token') 
        }
    },
    methods: {
        async logout() {
            localStorage.removeItem("token");
            await this.$nextTick();
            this.$router.push({ name: "login" });
        },
    },
};
</script>

<style lang="scss" scoped>
.navbar {
    padding: 20px 50px;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    background-color: black;
    position: sticky;
    top: 0;
    z-index: 1;
    margin-bottom: 30px;
    @media (max-width: 767px) {
        padding: 20px;
    }
    .navbar-logo {
        @media (max-width: 479px) {
            width: 100%;
            text-align: center;
            margin-bottom: 10px;
        }
        img {
            width: 100%;
            @media (max-width: 479px) {
                width: 80px;
            }
        }
    }
    .navbar-links {
        padding: 0;
        list-style-type: none;
        display: flex;
        align-items: center;
        @media (max-width: 479px) {
            width: 100%;
            justify-content: space-between;
        }
        li {
            margin-right: 30px;
            @media (max-width: 767px) {
                margin-right: 10px;
            }
            &:last-child {
                margin-right: 0px;
            }
            a {
                text-decoration: none;
                color: white;
                transition: all 0.3s;
                padding: 5px 10px;
                border-radius: 15px;
                font-size: 18px;
                @media (max-width: 767px) {
                    font-size: 16px;
                }
                &.active {
                    color: #ffc600;
                }
            }
        }
    }
    .navbar-logout {
        background-color: #d9534f;
        color: white;
        padding: 5px 10px;
        border-radius: 4px;
        font-size: 18px;
        @media (max-width: 767px) {
            font-size: 16px;
        }
    }
}
</style>

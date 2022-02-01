<template>
    <v-card class="text-center mx-auto grid-view">
        <v-dialog v-model="isOpened" width="400">
            <v-card class="px-5 py-3">
                <v-text-field placeholder="Name" label="Name" v-model="city.name" />

                <v-select
                    v-if="!countryId"
                    v-model="city.countryId"
                    :items="countries"
                    label="Country"
                    placeholder="Country"
                    item-text="name"
                    item-value="id"
                />
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" text @click="closeModal"> Cancel </v-btn>

                    <v-btn color="primary" @click="submit"> Save </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-data-table height="" :loading="isLoading" loading-text="Loading... Please wait" :headers="headers" :items="cities" :items-per-page="20" class="elevation-1">
            <template v-slot:top>
                <v-toolbar flat>
                    <v-toolbar-title>All Cities</v-toolbar-title>
                    <v-divider class="mx-4" inset vertical></v-divider>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" @click="openModal"> Add City </v-btn>
                </v-toolbar>
            </template>
            <template v-slot:item.actions="{ item }">
                <v-icon small class="mr-2" @click="openModal(item)"> mdi-pencil </v-icon>
                <v-icon small @click="deleteCity(item)"> mdi-delete </v-icon>
            </template>
        </v-data-table>
    </v-card>
</template>

<script>
export default {
    data() {
        return {
            headers: [
                { text: "City ID", value: "id", align: "left" },
                { text: "City Name", value: "name", align: "center" },
                { text: "Actions", value: "actions", sortable: false, align: "right" },
            ],
            countries: [],
            cities: [],
            city: {},
            isOpened: false,
            isLoading: false,

        };
    },

    computed: {
        countryId() {
            return this.$route.params.id;
        },
    },

    methods: {
        async getCountries() {
            try {
                const { data } = await this.$axios.get("/country");
                this.countries = data;
            } catch (e) {
                this.countries = [];
            }
        },

        async addCity() {
            try {
                const { data } = await this.$axios.post("/city", {
                    name: this.city.name,
                    countryId: this.countryId ? parseInt(this.countryId) : this.city.countryId,
                });
                this.cities.push(data);
            } catch (e) {
                //
            }
        },

        async deleteCity(city) {
            await this.$axios.delete(`/city/${city.id}`);
            let cityIndex = this.cities.findIndex(c => c.id === city.id);
            this.cities.splice(cityIndex, 1);
        },

        async editCity() {
            try {
                const { data } = await this.$axios.put("/city", {
                    id: this.city.id,
                    name: this.city.name,
                    countryId: this.city.countryId,
                });
                let cityIndex = this.cities.findIndex(city => city.id === this.city.id);
                this.cities.splice(cityIndex, 1, data);
            } catch (e) {
                //
            }
        },

        async getCities() {
            this.isLoading = true;
            try {
                const { data } = await this.$axios.get(this.countryId ? `/city/getcities/${this.countryId}` : "/city");
                this.cities = data;
            } catch (e) {
                this.cities = [];
            } finally {
                this.isLoading = false;
            }
        },

        async submit() {
            this.city.id ? this.editCity() : this.addCity();
            this.closeModal();
        },

        openModal(city = {}) {
            this.city = { ...city };
            this.isOpened = true;
        },

        closeModal() {
            this.isOpened = false;
        },
    },

    created() {
        this.getCities();
        this.getCountries();
    },
};
</script>

<style lang="scss" scoped></style>

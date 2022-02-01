<template>
    <v-card class="text-center mx-auto grid-view">
        <v-dialog v-model="isOpened" width="400">
            <v-card class="px-5 py-3">
                <v-text-field placeholder="Name" v-model="country.name" />
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" text @click="closeModal"> Cancel </v-btn>

                    <v-btn color="primary" @click="submit"> Save </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-data-table :loading="isLoading" loading-text="Loading... Please wait" :headers="headers" :items="countries" :items-per-page="20" class="elevation-1">
            <template v-slot:top>
                <v-toolbar flat>
                    <v-toolbar-title>All Countries</v-toolbar-title>
                    <v-divider class="mx-4" inset vertical></v-divider>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" @click="openModal"> Add Country </v-btn>
                </v-toolbar>
            </template>
            <template v-slot:item.actions="{ item }">
                <v-icon small class="mr-2" @click="$router.push(`cities/${item.id}`)"> mdi-eye </v-icon>
                <v-icon small class="mr-2" @click="openModal(item)"> mdi-pencil </v-icon>
                <v-icon small @click="deleteCountry(item)"> mdi-delete </v-icon>
            </template>
        </v-data-table>
    </v-card>
</template>

<script>
export default {
    data() {
        return {
            headers: [
                { text: "Country ID", value: "id", align: "left" },
                { text: "Country Name", value: "name", align: "center" },
                {
                    text: "Actions",
                    value: "actions",
                    sortable: false,
                    align: "right",
                },
            ],
            countries: [],
            country: {},
            isOpened: false,
            isLoading: false,
        };
    },

    methods: {
        async addCountry() {
            try {
                const { data } = await this.$axios.post("/country", this.country);
                this.countries.push(data);
            } catch (e) {
                //
            }
        },

        async deleteCountry(country) {
            await this.$axios.delete(`/country/${country.id}`);
            let countryIndex = this.countries.findIndex(c => c.id === country.id);
            this.countries.splice(countryIndex, 1);
        },

        async editCountry() {
            try {
                const { data } = await this.$axios.put("/country", this.country);
                let countryIndex = this.countries.findIndex(c => c.id === this.country.id);
                this.countries.splice(countryIndex, 1, data);
            } catch (e) {
                //
            }
        },

        async getCounties() {
            this.isLoading = true;
            try {
                const { data } = await this.$axios.get("/country");
                this.countries = data;
            } catch (e) {
                this.countries = [];
            } finally {
                this.isLoading = false
            }
        },

        async submit() {
            this.country.id ? this.editCountry() : this.addCountry();
            this.closeModal();
        },

        openModal(country = {}) {
            this.country = { ...country };
            this.isOpened = true;
        },

        closeModal() {
            this.isOpened = false;
        },
    },

    created() {
        this.getCounties();
    },
};
</script>


<template>
    <div>
      <v-row
          justify="center"
      >
        <v-btn
            color="primary"
            class="ma-2"
            dark
            @click="dialog = true"
        >
          Auth settings
        </v-btn>
        <v-dialog
            v-model="dialog"
            fullscreen
            hide-overlay
            transition="dialog-bottom-transition"
        >
          <v-card tile>
            <v-toolbar
                flat
                dark
                color="primary"
            >
              <v-btn
                  icon
                  dark
                  @click="dialog = false"
              >
                <v-icon>mdi-close</v-icon>
              </v-btn>
              <v-toolbar-title>Settings</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-toolbar-items>
                <v-btn
                    dark
                    text
                    @click="dialog = false"
                >
                  Save
                </v-btn>
              </v-toolbar-items>
            </v-toolbar>
            <v-card-text>
              <v-container>
                <v-row >
                  <v-text-field
                      v-model="login"
                      label="Login"
                      hide-details="auto"
                  ></v-text-field>
                </v-row>
                <v-row>
                  <v-text-field
                      v-model="password"
                      :append-icon="passwordShow ? 'mdi-eye' : 'mdi-eye-off'"
                      :type="passwordShow ? 'text' : 'password'"
                      name="input-10-2"
                      label="Password"
                      value=""
                      class="input-group--focused"
                      @click:append="passwordShow = !passwordShow"
                  ></v-text-field>
                </v-row>
                <v-row>
                  <v-col>
                    <v-btn
                        color="primary"
                        v-on:click="authorize">
                      Login
                    </v-btn>
                  </v-col>
                  <v-col>
                    <v-btn
                        color="error"
                        v-on:click="logout"
                        :disabled = "!logged">
                      Logout
                    </v-btn>
                  </v-col>
                  <v-col>
                    <v-btn
                        v-on:click="echo"
                        :disabled = "!logged">
                      Echo
                    </v-btn>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <div style="flex: 1 1 auto;"></div>
          </v-card>
        </v-dialog>
      </v-row>
    </div>
</template>

<script>
export default {
  name: "TestComponent",
  data() {
    return {
      dialog: false
    }
  }
}
</script>

<style scoped>

</style>
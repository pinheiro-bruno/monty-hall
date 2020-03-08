<template>
    <div>
      <form>
        <label for="email">Email:</label><br>
        <input v-model="email" id="email" name="email"><br>
        <label>Password</label><br>
        <input v-model="password" id="password" name="password" type="password"><br><br>
        <button type="button" @click="login">Login</button>
      </form>
    </div>
</template>

<script>
import { auth } from '@/firebase/firebaseConfig'

export default {
  name: 'Login',
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    login () {
      let email = this.email
      let password = this.password
      auth.signInWithEmailAndPassword(email, password).then(user => {
        this.$router.push('/dashboard')
      }).catch(function (error) {
        // Handle Errors here.
        let errorCode = error.code
        let errorMessage = error.message

        console.log(`${errorCode}: ${errorMessage}`)
      })
    }
  }
}
</script>

<style scoped>

</style>

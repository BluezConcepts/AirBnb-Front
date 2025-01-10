<script setup>
import { ref } from "vue";
import InputText from "primevue/inputtext";
import Password from "primevue/password";
import FileUpload from "primevue/fileupload";
import Button from "primevue/button";

const props = defineProps({
  user: Object,
});
console.log(JSON.stringify(props.user));
// Reactive variables for form inputs
const email = ref(props.user.email);
const password = ref("");
const newPassword = ref("");
const confirmNewPassword = ref("");
const profilePicture = ref(null);

async function updateEmail() {
  if (!email.value) {
    alert("Email cannot be empty.");
    return;
  }
  try {
    const response = await fetch("http://localhost:3000/profile/email", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: props.user.userId, email: email.value }),
    });
    if (!response.ok) throw new Error("Failed to update email.");
    alert("Email updated successfully!");
  } catch (error) {
    console.error(error);
    alert("Failed to update email.");
  }
}

async function updatePassword() {
  if (newPassword.value !== confirmNewPassword.value) {
    alert("Passwords do not match.");
    return;
  }
  try {
    const response = await fetch("http://localhost:3000/profile/password", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: props.user.userId,
        password: password.value,
        newPassword: newPassword.value,
      }),
    });
    if (!response.ok) throw new Error("Failed to update password.");
    alert("Password updated successfully!");
  } catch (error) {
    console.error(error);
    alert("Failed to update password.");
  }
}

// async function uploadProfilePicture(event) {
//   const file = event.files[0];
//   const formData = new FormData();
//   formData.append("profilePicture", file);
//   formData.append("userId", props.user.userId);

//   try {
//     const response = await fetch("http://localhost:3000/profile/picture", {
//       method: "POST",
//       body: formData,
//     });
//     if (!response.ok) throw new Error("Failed to upload profile picture.");
//     alert("Profile picture updated successfully!");
//   } catch (error) {
//     console.error(error);
//     alert("Failed to upload profile picture.");
//   }
// }
</script>

<template>
  <div class="profile-form p-card p-component w-full max-w-md mx-auto shadow-2">
    <!-- Email -->
    <div class="field mb-4">
      <label for="email" class="block text-900 font-medium mb-2 text-black"
        >Email Address</label
      >
      <InputText
        id="email"
        v-model="email"
        type="email"
        :placeholder="props.user.email"
        class="w-full"
      />
    </div>

    <!-- Password -->
    <div class="field mb-4">
      <label for="password" class="block text-900 font-medium mb-2 text-black"
        >Current Password</label
      >
      <Password
        id="password"
        v-model="password"
        placeholder="Enter current password"
        toggleMask
        class="w-full"
      />
    </div>
    <div class="field mb-4">
      <label
        for="newPassword"
        class="block text-900 font-medium mb-2 text-black"
        >New Password</label
      >
      <Password
        id="newPassword"
        v-model="newPassword"
        placeholder="Enter new password"
        toggleMask
        class="w-full"
      />
    </div>
    <div class="field mb-4">
      <label
        for="confirmNewPassword"
        class="block text-900 font-medium mb-2 text-black"
        >Confirm New Password</label
      >
      <Password
        id="confirmNewPassword"
        v-model="confirmNewPassword"
        placeholder="Confirm new password"
        toggleMask
        class="w-full"
      />
      <Button
        label="Update Password"
        class="mt-2 p-button-primary"
        @click="updatePassword"
      />
    </div>

    <!-- Profile Picture
    <div class="field mb-4">
      <label class="block text-900 font-medium mb-2 text-black"
        >Profile Picture</label
      >
      <FileUpload
        mode="basic"
        name="profilePicture"
        customUpload
        @upload="uploadProfilePicture"
        accept="image/*"
        class="w-full"
      />
    </div> -->
  </div>
</template>

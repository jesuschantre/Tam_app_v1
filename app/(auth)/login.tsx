import React, { useState } from 'react'
import { View, Text, TextInput, Pressable, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import DateTimePicker from '@react-native-community/datetimepicker'
import { router } from 'expo-router'
import Header from '../../components/Header'
import { useAuth } from '../../context/AuthContext'

export default function LoginScreen() {

  const [isLogin, setIsLogin] = useState(true)
  const { login } = useAuth()
  // Estado para bloquedo por intentos fallidos
  const [loginAttempts, setLoginAttempts] = useState(0)
  const [isBlocked, setIsBlocked] = useState(false)
  // Estados para el formulario LOGIN
  const [loginUser, setLoginUser] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  // Estados para el formulario REGISTRO
  const [email, setEmail] = useState('')
  const [birthDate, setBirthDate] = useState('')
  const [fullName, setFullName] = useState('')
  const [username, setUsername] = useState('')
  const [document, setDocument] = useState('')
  const [passwordReg, setPasswordReg] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPasswordReg, setShowPasswordReg] = useState(false)
  const [acceptTerms, setAcceptTerms] = useState(false)
  const [showDatePicker, setShowDatePicker] = useState(false)

  return (
    <SafeAreaView className="flex-1 bg-white">

      {/* HEADER */}
      <Header />

      {/* BACK */}
      <Pressable 
        onPress={() => router.back()}
        className="px-4 py-2"
      >
        <Ionicons name="arrow-back" size={24} />
      </Pressable>

      {/* TABS */}
      <View className="flex-row justify-center mt-4">

        {/* INICIAR SESIÓN */}
        <Pressable onPress={() => setIsLogin(true)}>
          {({ pressed }) => (
            <View 
              className="items-center mx-4"
              style={{ opacity: pressed ? 0.6 : 1 }}
            >
              <Text className={`text-[16px] font-semibold ${
                isLogin ? 'text-black' : 'text-gray-400'
              }`}>
                Iniciar sesión
              </Text>

              {/* LÍNEA ACTIVA */}
              <View
                style={{
                  height: 3,
                  width: 80,
                  marginTop: 4,
                  backgroundColor: isLogin ? '#6155F5' : 'transparent'
                }}
              />
            </View>
          )}
        </Pressable>

        {/* REGISTRARSE */}
        <Pressable onPress={() => setIsLogin(false)}>
          {({ pressed }) => (
            <View 
              className="items-center mx-4"
              style={{ opacity: pressed ? 0.6 : 1 }}
            >
              <Text className={`text-[16px] font-semibold ${
                !isLogin ? 'text-black' : 'text-gray-400'
              }`}>
                Registrarse
              </Text>

              {/* LÍNEA ACTIVA */}
              <View
                style={{
                  height: 3,
                  width: 80,
                  marginTop: 4,
                  backgroundColor: !isLogin ? '#6155F5' : 'transparent'
                }}
              />
            </View>
          )}
        </Pressable>

      </View>

      {/* LÍNEA GRIS DEBAJO */}
      <View className="h-[1px] bg-gray-300 mt-2 mx-6" />

      {/* CONTENIDO (FORMULARIOS) */}
      <ScrollView 
        className="flex-1 px-6 mt-6"
        showsVerticalScrollIndicator={false}
      >
        
        {/* FORM DE LOGIN  */}
        {isLogin && (
          <View>

            {/* ===== NOMBRE DE USUARIO ===== */}
            <Text className="text-gray-500 text-[14px] mb-1">
              Nombre de usuario
            </Text>

            <TextInput
              value={loginUser}
              onChangeText={setLoginUser}
              placeholder="Ej: usuario12345"
              keyboardType="email-address"
              className="border-b border-gray-400 pb-2 text-[16px]"
            />

            {/* ===== ESPACIO ===== */}
            <View className="h-6" />

            {/* ===== CONTRASEÑA ===== */}
            <Text className="text-gray-500 text-[14px] mb-1">
              Contraseña
            </Text>

            <View className="flex-row items-center border-b border-gray-400">

              <TextInput
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                className="flex-1 py-2 text-[16px]"
              />

              {/* ICONO DE VISBILIDAD PARA LA CONTRASEÑA */}
              <Pressable onPress={() => setShowPassword(!showPassword)}>
                {({ pressed }) => (
                  <Ionicons
                    name={showPassword ? "eye-off" : "eye"}
                    size={20}
                    color="gray"
                    style={{ opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>

            </View>

            {/* ===== OLVIDASTE CONTRASEÑA ===== */}
            <Pressable
              className="mt-3"
              onPress={() => console.log('Olvidó contraseña')}
            >
              {({ pressed }) => (
                <Text 
                  className="text-right text-gray-500 text-[13px]"
                  style={{ opacity: pressed ? 0.5 : 1 }}
                >
                  ¿Olvidaste tu contraseña?
                </Text>
              )}
            </Pressable>

            {/* ===== BOTÓN ===== */}
            <View className="items-center mt-8">
              <Pressable
                onPress={() => {
                  if (isBlocked) {
                      alert('Cuenta bloqueada. Revisa tu correo para recuperar acceso')
                      return
                  }

                  const usernameClean = loginUser.trim() // estás usando email como input
                  const passwordClean = password.trim()

                  // ===== VALIDAR VACÍOS =====
                  if (!usernameClean || !passwordClean) {
                    alert('Completa todos los campos')
                    return
                  }

                  // ===== USUARIO SIMULADO (BD) =====
                  const fakeUser = {
                    user_name: 'usuario12345',
                    password: 'Test@1234'
                  }

                  // ===== VALIDAR LOGIN =====
                  if (
                    usernameClean === fakeUser.user_name &&
                    passwordClean === fakeUser.password
                  ) {
                    login({
                      nombre: usernameClean,
                      email: 'test@gmail.com',
                      imagen: require('../../assets/images/fp_generica.png')
                    })
                    
                    // reset intentos
                    setLoginAttempts(0)

                    //Redirige al home/index
                    router.replace('/home')

                    // navegación futura aquí
                    return
                  }

                  // ===== ERROR LOGIN =====
                  const newAttempts = loginAttempts + 1
                  setLoginAttempts(newAttempts)

                  if (newAttempts >= 3) {
                    setIsBlocked(true)

                    // Simulación de envío de correo
                    alert(
                      'Has superado los 3 intentos.\nSe ha enviado un correo para recuperar tu cuenta.'
                    )
                    // Tiempo de bloqueo por los 3 intentos fallidos
                    setTimeout(() => {
                      setIsBlocked(false)
                      setLoginAttempts(0)
                    }, 30000) // 30 segundos

                    return
                  }

                  alert(`Usuario o contraseña incorrectos. Intento ${newAttempts} de 3`)

                }}
              >
                {({ pressed }) => (
                  <View
                    className="bg-primary px-8 py-3 rounded-full"
                    style={{
                      opacity: pressed ? 0.7 : 1,
                      transform: [{ scale: pressed ? 0.97 : 1 }]
                    }}
                  >
                    <Text className="text-tertiary text-[16px] font-semibold">
                      Iniciar sesión
                    </Text>
                  </View>
                )} 
              </Pressable>
            </View>

          </View>
        )}
        {/* FORMULARIO PARA REGISTRO */}
        {!isLogin && (
          <View>

            {/* ===== CORREO ===== */}
            <Text className="text-gray-500 text-[14px] mb-1">Correo</Text>
            <TextInput
              value={email}
              onChangeText={setEmail}
              placeholder="tu@ejemplo.com"
              className="border-b border-gray-400 pb-2 text-[16px]"
            />

            <View className="h-6" />

            {/* ===== FECHA NACIMIENTO ===== */}
            <Text className="text-gray-500 text-[14px] mb-1">
              Fecha de nacimiento
            </Text>

            <Pressable onPress={() => setShowDatePicker(true)}>
              <View className="flex-row items-center border-b border-gray-400 pb-2">
                <Text className={`flex-1 text-[16px] ${birthDate ? 'text-black' : 'text-gray-400'}`}>
                  {birthDate || 'dd/mm/aaaa'}
                </Text>
                <Ionicons name="calendar-outline" size={20} color="gray" />
              </View>
            </Pressable>

            {showDatePicker && (
              <DateTimePicker
                value={new Date()}
                mode="date"
                display="default"
                onChange={(event, date) => {
                  setShowDatePicker(false)
                  if (date) {
                    const formatted =
                      `${date.getDate().toString().padStart(2, '0')}/` +
                      `${(date.getMonth() + 1).toString().padStart(2, '0')}/` +
                      `${date.getFullYear()}`
                    setBirthDate(formatted)
                  }
                }}
              />
            )}

            <View className="h-6" />

            {/* ===== NOMBRE COMPLETO ===== */}
            <Text className="text-gray-500 text-[14px] mb-1">Nombre completo</Text>
            <TextInput
              value={fullName}
              onChangeText={setFullName}
              className="border-b border-gray-400 pb-2 text-[16px]"
            />

            <View className="h-6" />

            {/* ===== USERNAME ===== */}
            <Text className="text-gray-500 text-[14px] mb-1">
              Nombre de usuario
            </Text>
            <TextInput
              value={username}
              onChangeText={setUsername}
              className="border-b border-gray-400 pb-2 text-[16px]"
            />

            <View className="h-6" />

            {/* ===== DOCUMENTO ===== */}
            <Text className="text-gray-500 text-[14px] mb-1">
              Número de documento
            </Text>
            <TextInput
              value={document}
              onChangeText={setDocument}
              keyboardType="numeric"
              placeholder="CC"
              className="border-b border-gray-400 pb-2 text-[16px]"
            />

            <View className="h-6" />

            {/* ===== CONTRASEÑA ===== */}
            <Text className="text-gray-500 text-[14px] mb-1">Contraseña</Text>
            <View className="flex-row items-center border-b border-gray-400">
              <TextInput
                value={passwordReg}
                onChangeText={setPasswordReg}
                secureTextEntry={!showPasswordReg}
                className="flex-1 py-2 text-[16px]"
              />
              <Pressable onPress={() => setShowPasswordReg(!showPasswordReg)}>
                {({ pressed }) => (
                  <Ionicons
                    name={showPasswordReg ? "eye-off" : "eye"}
                    size={20}
                    color="gray"
                    style={{ opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </View>

            <View className="h-6" />

            {/* ===== CONFIRMAR CONTRASEÑA ===== */}
            <Text className="text-gray-500 text-[14px] mb-1">
              Confirmar contraseña
            </Text>
            <View className="flex-row items-center border-b border-gray-400">
              <TextInput
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry={!showPasswordReg}
                className="flex-1 py-2 text-[16px]"
              />
              <Pressable onPress={() => setShowPasswordReg(!showPasswordReg)}>
                {({ pressed }) => (
                  <Ionicons
                    name={showPasswordReg ? "eye-off" : "eye"}
                    size={20}
                    color="gray"
                    style={{ opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </View>

            <View className="h-6" />

            {/* ===== CHECKBOX ===== */}
            <Pressable
              onPress={() => setAcceptTerms(!acceptTerms)}
              className="flex-row items-center"
            >
              <View
                style={{
                  width: 18,
                  height: 18,
                  borderWidth: 1,
                  borderColor: 'gray',
                  marginRight: 8,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: acceptTerms ? '#0b3c78' : 'transparent'
                }}
              >
                {acceptTerms && <Ionicons name="checkmark" size={14} color="white" />}
              </View>

              <Text className="text-gray-600 text-[13px]">
                Acepto los términos y condiciones
              </Text>
            </Pressable>

            {/* ===== BOTÓN ===== */}
            <View className="items-center mt-8">
              <Pressable onPress={() => {
                // ===== LIMPIAR ESPACIOS =====
                const emailClean = email.trim().toLowerCase()
                const usernameClean = username.trim()
                const documentClean = document.trim()

                // ===== 1. VALIDAR CORREO =====
                const emailRegex = /^[a-zA-Z0-9._%+-]+@(gmail\.com|hotmail\.com)$/

                if (!emailRegex.test(emailClean)) {
                  alert('Solo se permiten correos Gmail o Hotmail')
                  return
                }

                // ===== SIMULACIÓN DUPLICADOS =====
                const fakeEmails = ['test@gmail.com', 'admin@hotmail.com']

                if (fakeEmails.includes(emailClean)) {
                  alert('Este correo ya está registrado')
                  return
                }

                // ===== 2. VALIDAR CONTRASEÑA =====
                const passwordRegex = /^(?=(?:.*\d){2,})(?=.*[!@#$%^&*]).{8,}$/

                if (!passwordRegex.test(passwordReg)) {
                  alert('La contraseña debe tener mínimo 8 caracteres, 2 números y 1 carácter especial')
                  return
                }

                if (passwordReg !== confirmPassword) {
                  alert('Las contraseñas no coinciden')
                  return
                }

                // ===== 3. VALIDAR EDAD =====
                if (!birthDate) {
                  alert('Selecciona tu fecha de nacimiento')
                  return
                }

                const parts = birthDate.split('/')
                const birth = new Date(`${parts[2]}-${parts[1]}-${parts[0]}`)
                const today = new Date()

                let age = today.getFullYear() - birth.getFullYear()
                const m = today.getMonth() - birth.getMonth()

                if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
                  age--
                }

                if (age < 18 || age > 100) {
                  alert('Debes tener ser mayor de 18 años y menor de 100 años.')
                  return
                }

                // ===== 4. VALIDAR USERNAME =====
                const usernameRegex = /^[a-zA-Z0-9]{11,20}$/

                if (!usernameRegex.test(usernameClean)) {
                  alert('El usuario debe tener entre 11 y 20 caracteres, sin símbolos')
                  return
                }

                const bannedWords = ['admin', 'root', 'xxx']

                if (bannedWords.some(word => usernameClean.toLowerCase().includes(word))) {
                  alert('El nombre de usuario contiene palabras no permitidas')
                  return
                }

                // ===== 5. VALIDAR DOCUMENTO =====
                const documentRegex = /^[0-9]{6,10}$/

                if (!documentRegex.test(documentClean)) {
                  alert('La cédula debe tener entre 6 y 10 dígitos')
                  return
                }

                const fakeDocuments = ['123456', '9876543210']

                if (fakeDocuments.includes(documentClean)) {
                  alert('Este documento ya está registrado')
                  return
                }

                // ===== 6. TÉRMINOS =====
                if (!acceptTerms) {
                  alert('Debes aceptar los términos y condiciones')
                  return
                }

                // ===== Registro correcto =====
                login({
                  nombre: usernameClean,
                  email: 'test@gmail.com',
                  imagen: '../../assets/images/fp_generica.png'
                })

                router.replace('/home')

                // Aquí luego se conecta con backend
              }}>
                {({ pressed }) => (
                  <View
                    className="bg-primary px-8 py-3 rounded-full"
                    style={{
                      opacity: pressed ? 0.7 : 1,
                      transform: [{ scale: pressed ? 0.97 : 1 }]
                    }}
                  >
                    <Text className="text-tertiary text-[16px] font-semibold">
                      Registrarse
                    </Text>
                  </View>
                )}
              </Pressable>
            </View>

          </View>
        )}

      </ScrollView>

    </SafeAreaView>
  )
}
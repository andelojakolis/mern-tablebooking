1. Run Docker desktop
2. cd "C:\Users\Jakov i Karlo\OneDrive\Desktop\restaurantbooking\server"
3. docker-compose up -d (to start local db running)

4. npm i
5. npm run dev

The cookies are absent in the request originating from Playground.

Here is a workaround:

Go to your GraphQl Playground

In the top right corner click on the gear icon (settings)

Change the following

{
-  "request.credentials": "omit",
+  "request.credentials": "same-origin",
}
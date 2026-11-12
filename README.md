# Shiva Ji Mishra — Personal Portfolio

Yeh HTML, CSS aur Vanilla JavaScript se bana responsive portfolio hai. Isme dark/light theme, mobile navigation, project cards, learning journey aur contact form validation hai.

## Project files

- `index.html` — website ka content
- `css/style.css` — layout, themes aur responsive styling
- `js/script.js` — theme, mobile menu, reveal effects aur form validation

Kisi framework ya package installation ki zaroorat nahi hai. Project ko local machine par seedha chalaya ja sakta hai.

## Local computer par chalana

1. Project folder ko apne computer par rakhein.
2. `index.html` ko browser mein double-click karke kholein.
3. Behtar local preview ke liye VS Code install karein, project folder ko VS Code mein kholein aur **Live Server** extension install karein.
4. `index.html` par right-click karke **Open with Live Server** chunein.
5. Desktop aur mobile screen sizes par navigation, theme toggle aur form validation check karein.

## GitHub Pages par publish karna

1. GitHub par account banayein ya sign in karein.
2. Ek naya repository banayein. Repository ko public rakhna sabse seedha tareeqa hai.
3. Is project ke `index.html`, `css`, `js`, `README.md` aur `.gitignore` ko repository mein upload karein. `index.html` repository ke root mein hona chahiye.
4. Repository mein **Settings → Pages** kholein.
5. **Build and deployment** ke source mein **Deploy from a branch** chunein.
6. Branch mein `main` aur folder mein `/(root)` select karke **Save** karein.
7. GitHub Pages deploy hone ke baad isi Pages screen par live URL dikhega. Pehli deployment mein thoda samay lag sakta hai.
8. Website update karne ke liye badli hui files ko repository mein dobara upload/commit karein.

## Netlify par publish karna

1. Netlify par account banayein ya sign in karein.
2. Dashboard mein **Add new site → Deploy manually** chunein.
3. `shiva-portfolio` project folder ko upload area par drag-and-drop karein.
4. Deployment complete hone par Netlify aapko public website URL dega.
5. Update ke liye badli hui project files ko dobara deploy karein, ya repository connect karke automatic deployment set up karein.

## Custom domain

`shivajimishra.com` jaise domain ko GitHub Pages ya Netlify ki domain settings mein add karke connect kiya ja sakta hai. Domain ki availability yahan check nahi ki gayi hai. Domain registrar par pehle availability check karke domain khareedein, phir hosting provider ke diye DNS records ko registrar mein configure karein. DNS update hone mein samay lag sakta hai.

## Apni details update karna

- Naam, parichay aur education: `index.html` mein edit karein.
- Email aur social profiles: Contact section mein apni asli details/link add karein.
- Project descriptions aur demo/repository links: Project cards edit karein. Abhi koi working demo ya GitHub URL nahi diya gaya, isliye cards par **Coming Soon** hai.
- Colors, spacing aur mobile layout: `css/style.css` mein edit karein.
- Interactions: `js/script.js` mein edit karein.

Contact form abhi browser mein required fields, naam, email aur message length validate karta hai. Yeh email nahi bhejta aur success message se delivery ka daawa nahi karta. Messages receive karne ke liye apna backend ya form service connect karna hoga.

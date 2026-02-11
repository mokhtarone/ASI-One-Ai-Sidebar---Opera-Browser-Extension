# Installation de l'extension ASI:One pour Opera

## Méthode 1 : Installation en mode développeur

1. Ouvrez Opera et allez dans `opera://extensions/`
2. Activez le mode développeur en cochant la case en haut à droite
3. Cliquez sur "Charger une extension non empaquetée"
4. Sélectionnez le dossier `opera-asi1-extension` que nous venons de créer
5. L'extension devrait maintenant apparaître dans votre liste d'extensions

## Méthode 2 : Installation depuis le fichier ZIP

1. Créez un fichier ZIP contenant tous les fichiers du dossier `opera-asi1-extension` :
```bash
cd /home/arch/Desktop
zip -r asi1-opera-extension.zip opera-asi1-extension/
```

2. Dans Opera, allez dans `opera://extensions/`
3. Glissez-déposez le fichier ZIP sur la page, ou cliquez sur "Charger une extension non empaquetée" et sélectionnez le fichier ZIP

## Utilisation

Une fois installée, l'extension est accessible via :
- L'icône ASI:One dans la barre des extensions
- La barre latérale d'Opera (si activée)

## Configuration initiale

1. Cliquez sur l'icône de l'extension
2. Entrez vos identifiants ASI:One (email et mot de passe)
3. L'extension se connectera automatiquement et sauvegardera vos identifiants de façon sécurisée
4. Vous pouvez maintenant utiliser le chat AI directement depuis la barre latérale

## Mise à jour future

Pour mettre à jour l'extension :
1. Supprimez l'extension actuelle depuis `opera://extensions/`
2. Réinstallez-la en suivant les étapes ci-dessus avec la nouvelle version

## Dépannage

Si l'extension ne fonctionne pas :
- Vérifiez que JavaScript est activé dans Opera
- Assurez-vous que vous avez accès à internet
- Redémarrez Opera après l'installation
- Vérifiez que l'URL `https://asi1.ai` est accessible depuis votre navigateur
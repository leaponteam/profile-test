// Profile.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function Profile() {
    
    const {username}  = useParams();
    const [profileData, setProfileData] = useState(null);
    const [metaTags, setMetaTags] = useState({});

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                // const response = await fetch(`http://127.0.0.1:8000/user/${username}/`);
                const response = await fetch(`https://leaponapi-test.herokuapp.com/user/${username}/`);
                
                const data = await response.json();
                setProfileData(data);
                setMetaTags(data);
            } catch (error) {
                console.error("Error fetching profile data:", error);
            }
        };

        fetchProfileData();
    }, [username]);
console.log(metaTags)
    useEffect(() => {
        if (metaTags && Object.keys(metaTags).length > 0) {
            document.title = metaTags.title;

            // Remove existing meta tags
            const metaTagsToRemove = document.querySelectorAll('meta[property^="og:"]');
            metaTagsToRemove.forEach((metaTag) => metaTag.remove());

            // Remove existing description meta tag
            const descriptionMetaTagToRemove = document.querySelector('meta[name="description"]');
            if (descriptionMetaTagToRemove) {
                descriptionMetaTagToRemove.remove();
            }

            // Add new meta tags
            const metaTitle = document.createElement('meta');
            metaTitle.setAttribute('property', 'og:title');
            metaTitle.setAttribute('content', metaTags.title);
            document.head.appendChild(metaTitle);

            const metaDescription = document.createElement('meta');
            metaDescription.setAttribute('property', 'og:description');
            metaDescription.setAttribute('content', metaTags.description);
            document.head.appendChild(metaDescription);

            const metaImage = document.createElement('meta');
            metaImage.setAttribute('property', 'og:image');
            metaImage.setAttribute('content', metaTags.image);
            document.head.appendChild(metaImage);

            const metaUrl = document.createElement('meta');
            metaUrl.setAttribute('property', 'og:url');
            metaUrl.setAttribute('content', metaTags.url);
            document.head.appendChild(metaUrl);

            const metaType = document.createElement('meta');
            metaType.setAttribute('property', 'og:type');
            metaType.setAttribute('content', "profile");
            document.head.appendChild(metaType);

            // Add new description meta tag
            const descriptionMetaTag = document.createElement('meta');
            descriptionMetaTag.setAttribute('name', 'description');
            descriptionMetaTag.setAttribute('content', metaTags.description);
            document.head.appendChild(descriptionMetaTag);
        }
    }, [metaTags]);

    if (!profileData) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>{username}'s Profile</h1>
        </div>
    );
}

export default Profile;
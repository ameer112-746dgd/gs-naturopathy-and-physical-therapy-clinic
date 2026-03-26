export const generateWhatsAppLink = (message) => {
    const phoneNumber = "2347079797317";
    const encodedMessage = encodeURIComponent(message);
    return `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
};
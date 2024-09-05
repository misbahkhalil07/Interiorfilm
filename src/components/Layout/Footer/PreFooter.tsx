import TextwithIcon from 'components/TextwithIcon'
import React from 'react'
import { BiMessageAlt } from 'react-icons/bi'
import icon from './t.svg'
const PreFooter = () => {
    return (
        <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-4 md:px-15 place-items-center">

            <TextwithIcon Icon={<svg width="69" height="67" viewBox="0 0 69 67" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M23.157 20.5279L21.6362 29.3235C21.5562 29.7364 21.5957 30.1635 21.7499 30.555C21.9042 30.9464 22.167 31.2862 22.5076 31.5346C22.8426 31.7845 23.241 31.9361 23.6579 31.9723C24.0748 32.0085 24.4936 31.9278 24.8669 31.7394L33.0876 27.6446L40.8807 31.6902C41.2528 31.89 41.6737 31.9816 42.0955 31.9543C42.5172 31.927 42.9228 31.7821 43.2658 31.5361C43.6088 31.2901 43.8754 30.9529 44.0351 30.5631C44.1948 30.1732 44.2412 29.7465 44.169 29.3317L42.6482 20.5689L49.0439 14.3366C49.3445 14.0457 49.5574 13.6767 49.6584 13.2715C49.7593 12.8662 49.7444 12.4409 49.6152 12.0437C49.486 11.6465 49.2477 11.2932 48.9273 11.024C48.607 10.7548 48.2173 10.5803 47.8025 10.5203L38.8831 9.22637L34.9043 1.23339C34.7158 0.861136 34.4265 0.548832 34.0691 0.331757C33.7118 0.114682 33.3006 0.00148712 32.8821 0.00496041C32.4649 0.00301601 32.0555 0.116932 31.6997 0.333922C31.344 0.550912 31.0559 0.862388 30.868 1.23339L26.881 9.22637L17.9616 10.5039C17.5427 10.5603 17.1483 10.7333 16.8238 11.0031C16.4993 11.2729 16.2579 11.6285 16.1273 12.0289C15.9968 12.4294 15.9824 12.8585 16.0858 13.2667C16.1893 13.675 16.4063 14.0459 16.712 14.3366L23.157 20.5279ZM27.8675 11.5686C28.0609 11.5364 28.2439 11.4586 28.4012 11.3418C28.5585 11.225 28.6855 11.0725 28.7717 10.897L32.8821 2.7075L36.9924 10.897C37.081 11.0756 37.2118 11.23 37.3736 11.347C37.5355 11.464 37.7234 11.5401 37.9213 11.5686L47.0298 12.8789L40.4533 19.2176C40.3086 19.3561 40.2 19.5277 40.1369 19.7175C40.0739 19.9074 40.0583 20.1096 40.0916 20.3068L41.6453 29.2743L33.6795 25.1386C33.5052 25.0495 33.3122 25.003 33.1163 25.003C32.9205 25.003 32.7275 25.0495 32.5532 25.1386L24.1682 29.3317L25.7301 20.3232C25.7575 20.1266 25.7366 19.9263 25.6694 19.7394C25.6021 19.5526 25.4903 19.3848 25.3437 19.2503L18.7672 12.9117L27.8675 11.5686Z" fill="black" />
                <path d="M67.4093 36.4482C66.9964 35.9731 66.4934 35.5838 65.9291 35.3027C65.3648 35.0216 64.7504 34.8543 64.1211 34.8103C63.4919 34.7672 62.8604 34.8509 62.2643 35.0563C61.6683 35.2618 61.1199 35.5847 60.652 36.006L49.2664 46.1938C49.2367 45.9674 49.1928 45.7431 49.1348 45.5222C48.9435 44.8126 48.6006 44.1526 48.1295 43.5872C47.6585 43.0218 47.0704 42.5645 46.4056 42.2464C44.2929 41.362 41.3581 41.7714 38.522 42.1809C36.8632 42.5045 35.1689 42.6091 33.4827 42.4921C32.7323 42.3045 32.0066 42.0297 31.3207 41.6732C29.1669 40.715 26.2157 39.4047 20.7243 40.6085C17.8891 41.338 15.2849 42.769 13.153 44.7688V41.7714C13.153 41.4456 13.0231 41.1332 12.7919 40.9028C12.5606 40.6724 12.247 40.543 11.9199 40.543H1.2331C0.90606 40.543 0.592416 40.6724 0.361166 40.9028C0.129915 41.1332 0 41.4456 0 41.7714V65.5211C0 65.8469 0.129915 66.1593 0.361166 66.3897C0.592416 66.6201 0.90606 66.7495 1.2331 66.7495H11.9199C12.247 66.7495 12.5606 66.6201 12.7919 66.3897C13.0231 66.1593 13.153 65.8469 13.153 65.5211V63.8176C14.7972 64.2025 22.2615 65.9305 27.7776 65.9305C33.532 65.9305 40.5689 64.6202 44.9012 62.7448C52.8834 59.297 66.0283 44.4166 67.097 43.2128C68.0229 42.3477 68.5735 41.1569 68.6318 39.8937C68.6902 38.6305 68.2516 37.3944 67.4093 36.4482ZM10.6868 64.2926H2.4662V42.9999H10.6868V64.2926ZM65.3871 41.4357L65.272 41.5503C65.1322 41.7059 51.5517 57.2005 43.8983 60.5009C39.8702 62.2452 33.2279 63.4737 27.7776 63.4737C22.0231 63.4737 13.5312 61.3772 13.449 61.3608C13.3507 61.3489 13.2513 61.3489 13.153 61.3608V48.2575C14.0491 47.2338 17.214 43.9089 21.2586 43.0244C25.9608 42.0007 28.279 43.0244 30.3013 43.9335C31.1738 44.3616 32.096 44.6807 33.047 44.8834C34.9885 45.0659 36.9462 44.9666 38.859 44.5886C41.2512 44.261 43.964 43.8843 45.4355 44.4985C45.7519 44.6797 46.0285 44.9224 46.2488 45.2122C46.4691 45.5021 46.6287 45.8331 46.718 46.1856C46.8374 46.669 46.8392 47.1738 46.7234 47.6581C46.6076 48.1424 46.3775 48.5922 46.0521 48.97C44.1778 51.476 32.7757 55.2268 28.0982 54.8583C27.7711 54.8333 27.4475 54.9388 27.1986 55.1515C26.9496 55.3642 26.7956 55.6667 26.7705 55.9925C26.7455 56.3183 26.8513 56.6407 27.0649 56.8888C27.2784 57.1368 27.5821 57.2902 27.9091 57.3152C28.1639 57.3152 28.4435 57.3152 28.7312 57.3152C33.8362 57.3152 43.5859 54.3178 47.1537 51.3204L47.2441 51.2713L62.2385 37.8405C62.6891 37.4406 63.2802 37.2346 63.8827 37.2672C64.198 37.2862 64.5062 37.3686 64.7887 37.5093C65.0713 37.6501 65.3223 37.8463 65.5268 38.0861C65.949 38.5512 66.1709 39.1629 66.1447 39.7894C66.1186 40.4159 65.8465 41.0071 65.3871 41.4357Z" fill="black" />
            </svg>
            } title='Hight Quality' subTitle='Craft from top material' />
            <TextwithIcon Icon={<svg width="53" height="67" viewBox="0 0 53 67" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M51.7509 24.3678L47.3681 19.6202L48.7395 13.3594C48.8667 12.8041 48.5274 12.2488 47.976 12.0683L41.7694 10.0971L39.7759 4.00291C39.5921 3.46151 39.0266 3.14222 38.4611 3.25328L32.0848 4.59983L27.2495 0.296405C26.8254 -0.0922914 26.1609 -0.0922914 25.7367 0.296405L20.9015 4.59983L14.5252 3.25328C13.9597 3.12834 13.3941 3.46151 13.2103 4.00291L11.2027 10.0971L4.98193 12.0683C4.43054 12.2488 4.10538 12.8041 4.21848 13.3594L5.58987 19.6202L1.20706 24.3678C0.811189 24.7843 0.811189 25.4367 1.20706 25.8532L5.58987 30.6008L4.21848 36.8616C4.09124 37.4169 4.43054 37.9722 4.98193 38.1527L11.1886 40.1239L11.4431 40.9152L4.06296 61.0025C3.89331 61.4467 4.03469 61.9465 4.41642 62.238C4.78399 62.5295 5.30711 62.5711 5.71711 62.3213L13.2527 57.7957L16.0945 66C16.25 66.4442 16.6742 66.7496 17.1549 66.7496H17.169C17.6497 66.7496 18.0739 66.4581 18.2294 66.0139L24.5491 48.8557L25.7367 49.9107C25.9488 50.1051 26.2174 50.2023 26.5002 50.2023C26.783 50.2023 27.0374 50.1051 27.2637 49.9107L28.4513 48.8557L34.771 66.0139C34.9265 66.4581 35.3648 66.7496 35.8314 66.7496H35.8455C36.3262 66.7496 36.7504 66.4442 36.9059 66L39.7476 57.7957L47.2833 62.3213C47.6933 62.5711 48.2164 62.5295 48.584 62.238C48.9516 61.9465 49.093 61.4467 48.9374 61.0025L41.5432 40.9291L41.7977 40.1378L48.0043 38.1665C48.5557 37.9861 48.8809 37.4308 48.7678 36.8755L47.3964 30.6147L51.7792 25.8671C52.1468 25.4367 52.1468 24.7982 51.7509 24.3678ZM17.1831 62.2935L14.921 55.769C14.8079 55.4497 14.5535 55.1998 14.2283 55.0749C13.9031 54.9499 13.5496 54.9916 13.2527 55.172L7.25817 58.7675L12.56 44.3718L13.1679 46.2181C13.3517 46.7595 13.9172 47.0788 14.4828 46.9678L20.8591 45.6212L22.697 47.2593L17.1831 62.2935ZM45.6857 58.7814L39.6911 55.1859C39.3942 55.0054 39.0407 54.9777 38.7156 55.0887C38.3904 55.1998 38.1359 55.4497 38.0228 55.7828L35.7607 62.3074L30.2185 47.2732L32.0565 45.6351L38.4328 46.9816C38.9983 47.1066 39.5638 46.7734 39.7476 46.232L40.3556 44.3857L45.6857 58.7814ZM45.3181 29.5458C45.0777 29.8096 44.9788 30.1705 45.0494 30.5176L46.3219 36.3619L40.5394 38.1943C40.2001 38.3054 39.9173 38.5691 39.8042 38.9162L39.2528 40.582L37.938 44.5939L31.9858 43.3445C31.6323 43.2751 31.2647 43.3723 30.9961 43.6083L26.4861 47.6063L21.976 43.5944C21.7639 43.414 21.4953 43.3029 21.2125 43.3029C21.1277 43.3029 21.057 43.3168 20.9722 43.3307L15.02 44.58L13.7052 40.5681L13.1538 38.9023C13.0407 38.5691 12.772 38.2915 12.4186 38.1804L6.65023 36.3619L7.92266 30.5176C7.99335 30.1705 7.89439 29.8096 7.65404 29.5458L3.58227 25.1174L7.66818 20.6891C7.90852 20.4253 8.00749 20.0644 7.9368 19.7173L6.66437 13.873L12.4469 12.0406C12.7862 11.9295 13.0689 11.6658 13.1821 11.3187L15.0342 5.64098L20.9863 6.89037C21.3398 6.95978 21.7074 6.8626 21.976 6.62661L26.4861 2.62859L30.9961 6.64049C31.2647 6.87648 31.6323 6.97366 31.9858 6.90425L37.938 5.65487L39.8042 11.3326C39.9173 11.6658 40.1859 11.9434 40.5394 12.0545L46.3219 13.8869L45.0494 19.7312C44.9788 20.0783 45.0777 20.4392 45.3181 20.703L49.3899 25.1174L45.3181 29.5458Z" fill="black" />
                <path d="M26.4873 9.01465C17.1278 9.01465 9.52148 16.4832 9.52148 25.6731C9.52148 34.863 17.1278 42.3315 26.4873 42.3315C35.8467 42.3315 43.453 34.863 43.453 25.6731C43.453 16.4832 35.8467 9.01465 26.4873 9.01465ZM26.4873 40.1104C18.3861 40.1104 11.7836 33.6275 11.7836 25.6731C11.7836 17.7187 18.3861 11.2358 26.4873 11.2358C34.5884 11.2358 41.1909 17.7187 41.1909 25.6731C41.1909 33.6275 34.5884 40.1104 26.4873 40.1104Z" fill="black" />
                <path d="M32.8065 17.4268L23.0936 26.8666L20.167 24.0208C19.2904 23.174 17.8625 23.174 16.9718 24.0208L15.1762 25.7561C14.7521 26.1725 14.5117 26.7278 14.5117 27.3247C14.5117 27.9216 14.7521 28.4769 15.1762 28.8934L21.496 35.0292C21.9342 35.4596 22.5139 35.6678 23.0936 35.6678C23.6732 35.6678 24.2529 35.4596 24.6912 35.0292L37.7973 22.3133C38.2214 21.8968 38.4617 21.3416 38.4617 20.7446C38.4617 20.1477 38.2214 19.5924 37.7973 19.176L36.0017 17.4407C35.1251 16.58 33.6831 16.58 32.8065 17.4268ZM25.695 30.934L23.0936 33.4467L16.788 27.3247L18.5835 25.6033L22.3018 29.2127C22.7401 29.643 23.447 29.643 23.8853 29.2127L34.4041 19.0094L33.6124 18.2181L36.1996 20.7308L25.695 30.934Z" fill="black" />
            </svg>
            } title='Warrany Protection' subTitle='Over 2 years' />
            <TextwithIcon Icon={<svg width="62" height="67" viewBox="0 0 62 67" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M61.4055 16.2522L31.598 0.139915C31.4321 0.0512514 31.2471 0.00488281 31.0592 0.00488281C30.8713 0.00488281 30.6862 0.0512514 30.5203 0.139915L0.712829 16.2522C0.527621 16.3485 0.372106 16.4937 0.263022 16.6721C0.153926 16.8506 0.0954009 17.0556 0.09375 17.2649V49.4895C0.0943003 49.6977 0.151107 49.9018 0.258104 50.0802C0.365113 50.2585 0.518301 50.4044 0.701365 50.5023L30.5089 66.6145C30.6748 66.7033 30.8598 66.7496 31.0477 66.7496C31.2356 66.7496 31.4206 66.7033 31.5865 66.6145L61.394 50.5023C61.5771 50.4044 61.7303 50.2585 61.8372 50.0802C61.9443 49.9018 62.0011 49.6977 62.0016 49.4895V17.2649C62.0022 17.0579 61.9471 16.8545 61.8422 16.6764C61.7373 16.4981 61.5864 16.3516 61.4055 16.2522ZM31.0477 2.46469L58.4477 17.2649L50.4226 21.6037L23.9741 6.2856L31.0477 2.46469ZM3.64772 17.2649L12.2804 12.6614L38.7174 27.9221L31.0477 32.0652L3.64772 17.2649ZM21.601 7.56307L48.0494 22.8812L41.0905 26.6446L14.6536 11.3149L21.601 7.56307ZM42.6153 28.4284L48.8519 25.0679V33.6534L46.4444 31.2596C46.3106 31.1262 46.1462 31.028 45.9655 30.9736C45.785 30.9193 45.5938 30.9105 45.4089 30.9481C45.2241 30.9857 45.0514 31.0684 44.9061 31.1889C44.7607 31.3095 44.6472 31.4642 44.5757 31.6394L42.6153 36.381V28.4284ZM2.38663 19.1869L29.9012 34.0677V63.6798L2.38663 48.799V19.1869ZM32.1941 63.6798V34.0677L40.3224 29.6714V42.1699C40.3357 42.4276 40.4349 42.6734 40.604 42.8677C40.7731 43.0621 41.0024 43.1936 41.2549 43.2415C41.5076 43.2892 41.7689 43.2505 41.9968 43.1312C42.2248 43.012 42.4063 42.8195 42.5121 42.5842L46.0202 34.0792L49.1615 37.2096C49.3219 37.372 49.5267 37.4826 49.75 37.5276C49.9733 37.5726 50.2047 37.5498 50.4151 37.4621C50.6254 37.3744 50.8049 37.226 50.9308 37.0354C51.0567 36.8449 51.1233 36.6211 51.1219 36.3925V23.8249L59.6973 19.2214V48.799L32.1941 63.6798Z" fill="black" />
            </svg>
            } title='Free Shipping' subTitle='Order over 10 METERS' />
            <TextwithIcon Icon={<svg width="68" height="67" viewBox="0 0 68 67" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M55.3302 35.9192C54.6963 35.2906 53.8367 34.9375 52.9404 34.9375C52.044 34.9375 51.1844 35.2906 50.5505 35.9192L47.3628 39.0809C47.3561 39.0809 47.3538 39.0955 47.3482 39.1011L45.7707 40.6579C45.2492 41.1784 44.6292 41.5916 43.9462 41.8734C43.2632 42.1553 42.5307 42.3005 41.791 42.3005C41.0512 42.3005 40.3187 42.1553 39.6357 41.8734C38.9526 41.5916 38.3327 41.1784 37.8112 40.6579L26.6561 29.5934C26.1313 29.0761 25.7147 28.4608 25.4306 27.7832C25.1463 27.1055 25 26.3788 25 25.6449C25 24.9109 25.1463 24.1843 25.4306 23.5065C25.7147 22.8289 26.1313 22.2137 26.6561 21.6963L28.2269 20.1317L28.2415 20.1227L31.4291 16.9621C31.7431 16.6507 31.9922 16.2811 32.162 15.8743C32.3319 15.4675 32.4195 15.0314 32.4195 14.591C32.4195 14.1507 32.3319 13.7146 32.162 13.3078C31.9922 12.901 31.7431 12.5314 31.4291 12.22L21.8651 2.72803C21.2212 2.11815 20.365 1.77783 19.4747 1.77783C18.5843 1.77783 17.7282 2.11815 17.0842 2.72803L13.8977 5.88867L13.8898 5.90097C10.0947 9.67249 7.86933 14.7222 7.65597 20.0466C7.44262 25.371 9.25692 30.5801 12.7382 34.6384V38.5333C12.576 38.597 12.4194 38.6618 12.2661 38.7278L9.27568 35.7616C9.06039 35.5597 8.77534 35.4472 8.47905 35.4472C8.18275 35.4472 7.8977 35.5597 7.68242 35.7616L2.9049 40.5003C2.69367 40.7099 2.575 40.9941 2.575 41.2905C2.575 41.5869 2.69367 41.8711 2.9049 42.0806L5.89536 45.0468C5.82775 45.1988 5.76353 45.3542 5.6993 45.5151H1.47052C1.17168 45.5151 0.885085 45.6329 0.67377 45.8425C0.462467 46.052 0.34375 46.3363 0.34375 46.6327V53.3385C0.34375 53.6349 0.462467 53.9192 0.67377 54.1287C0.885085 54.3383 1.17168 54.4561 1.47052 54.4561H5.6993C5.76353 54.617 5.82775 54.7724 5.89536 54.9232L2.9049 57.8905C2.69367 58.1001 2.575 58.3843 2.575 58.6807C2.575 58.9771 2.69367 59.2613 2.9049 59.4709L7.68242 64.2096C7.89372 64.4191 8.18027 64.5368 8.47905 64.5368C8.77782 64.5368 9.06437 64.4191 9.27568 64.2096L12.2661 61.2434C12.4194 61.3093 12.576 61.3742 12.7382 61.4379V65.6323C12.7382 65.9287 12.857 66.213 13.0683 66.4226C13.2795 66.6321 13.5662 66.7499 13.865 66.7499H20.6257C20.9245 66.7499 21.2111 66.6321 21.4224 66.4226C21.6337 66.213 21.7524 65.9287 21.7524 65.6323V61.4379C21.9147 61.3742 22.0713 61.3093 22.2245 61.2434L25.215 64.2096C25.4303 64.4115 25.7153 64.524 26.0116 64.524C26.308 64.524 26.5929 64.4115 26.8083 64.2096L31.5858 59.4709C31.797 59.2613 31.9157 58.9771 31.9157 58.6807C31.9157 58.3843 31.797 58.1001 31.5858 57.8905L28.5953 54.9232C28.6629 54.7724 28.7271 54.617 28.7914 54.4561H32.7171C36.8058 57.9149 42.0583 59.7183 47.4279 59.5067C52.7974 59.2953 57.8894 57.0845 61.6886 53.315L61.7033 53.306L64.8898 50.1443C65.2037 49.8329 65.4528 49.4633 65.6226 49.0565C65.7926 48.6497 65.8801 48.2136 65.8801 47.7733C65.8801 47.3329 65.7926 46.8968 65.6226 46.49C65.4528 46.0832 65.2037 45.7136 64.8898 45.4022L55.3302 35.9192ZM18.6797 4.30724C18.8944 4.10405 19.1797 3.99068 19.4763 3.99068C19.773 3.99068 20.0583 4.10405 20.273 4.30724L29.8336 13.7914C30.0446 14.0009 30.163 14.2849 30.163 14.581C30.163 14.877 30.0446 15.161 29.8336 15.3706L27.4449 17.7388L16.2898 6.67436L18.6797 4.30724ZM31.8934 52.2208H27.9947C27.7562 52.2208 27.5238 52.2959 27.3311 52.4353C27.1383 52.5747 26.9951 52.7712 26.9221 52.9965C26.7472 53.5555 26.5189 54.0967 26.2404 54.6125C26.1234 54.8244 26.0789 55.0683 26.1134 55.3075C26.148 55.5467 26.2597 55.7683 26.4319 55.9392L29.1948 58.6807L26.0116 61.8391L23.2477 59.0976C23.0753 58.9265 22.8516 58.8155 22.6102 58.7813C22.3689 58.747 22.1229 58.7913 21.909 58.9076C21.3893 59.1846 20.8436 59.4111 20.2797 59.5837C20.0528 59.6564 19.8549 59.7984 19.7147 59.9897C19.5744 60.1808 19.4988 60.4112 19.4989 60.6477V64.5147H14.9918V60.6477C14.9919 60.4112 14.9163 60.1808 14.776 59.9897C14.6357 59.7984 14.4379 59.6564 14.2109 59.5837C13.6471 59.4111 13.1014 59.1846 12.5816 58.9076C12.3678 58.7913 12.1218 58.747 11.8804 58.7813C11.6391 58.8155 11.4154 58.9265 11.243 59.0976L8.47905 61.8391L5.30155 58.6807L8.0644 55.9392C8.2366 55.7683 8.34834 55.5467 8.38288 55.3075C8.41741 55.0683 8.37287 54.8244 8.25595 54.6125C7.9793 54.0964 7.75292 53.5553 7.57988 52.9965C7.5063 52.7694 7.3614 52.5715 7.16637 52.4321C6.97134 52.2925 6.7364 52.2185 6.49593 52.2208H2.5973V47.7503H6.49593C6.73449 47.7503 6.96689 47.6752 7.15965 47.5359C7.35242 47.3965 7.49561 47.2 7.56861 46.9747C7.74165 46.4159 7.96803 45.8748 8.24468 45.3586C8.3616 45.1467 8.40615 44.9029 8.37161 44.6637C8.33707 44.4245 8.22533 44.2029 8.05313 44.032L5.30155 41.2905L8.47905 38.1321L11.243 40.8736C11.4154 41.0447 11.6391 41.1557 11.8804 41.1899C12.1218 41.2242 12.3678 41.1798 12.5816 41.0636C13.1014 40.7865 13.6471 40.5601 14.2109 40.3874C14.4379 40.3148 14.6357 40.1728 14.776 39.9815C14.9163 39.7903 14.9919 39.56 14.9918 39.3235V35.4565H19.4989V39.3235C19.4988 39.56 19.5744 39.7903 19.7147 39.9815C19.8549 40.1728 20.0528 40.3148 20.2797 40.3874C20.8436 40.5601 21.3893 40.7865 21.909 41.0636C22.1229 41.1798 22.3689 41.2242 22.6102 41.1899C22.8516 41.1557 23.0753 41.0447 23.2477 40.8736L26.0116 38.1321L29.1948 41.2905L26.4319 44.032C26.2597 44.2029 26.148 44.4245 26.1134 44.6637C26.0789 44.9029 26.1234 45.1467 26.2404 45.3586C26.5189 45.8745 26.7472 46.4157 26.9221 46.9747C26.9951 47.2 27.1383 47.3965 27.3311 47.5359C27.5238 47.6752 27.7562 47.7503 27.9947 47.7503H31.8934V52.2208ZM34.1469 52.7316V46.6327C34.1469 46.3363 34.0282 46.052 33.8169 45.8425C33.6056 45.6329 33.319 45.5151 33.0202 45.5151H28.7914C28.7271 45.3542 28.6629 45.1988 28.5953 45.0468L31.5858 42.0806C31.797 41.8711 31.9157 41.5869 31.9157 41.2905C31.9157 40.9941 31.797 40.7099 31.5858 40.5003L26.8083 35.7616C26.597 35.5521 26.3104 35.4344 26.0116 35.4344C25.7128 35.4344 25.4263 35.5521 25.215 35.7616L22.2245 38.7278C22.0713 38.6618 21.9147 38.597 21.7524 38.5333V34.3389C21.7524 34.0425 21.6337 33.7582 21.4224 33.5486C21.2111 33.339 20.9245 33.2213 20.6257 33.2213H14.478C11.4764 29.7362 9.84729 25.2917 9.89157 20.7082C9.93596 16.1249 11.6507 11.7122 14.7191 8.28485L25.8482 19.3236L25.0595 20.1127C24.3247 20.8379 23.7416 21.6999 23.3438 22.6493C22.9459 23.5987 22.7411 24.6168 22.7411 25.6449C22.7411 26.673 22.9459 27.691 23.3438 28.6404C23.7416 29.5899 24.3247 30.4519 25.0595 31.1771L36.2146 42.2416C36.9449 42.9699 37.8132 43.5481 38.7695 43.9428C39.7258 44.3375 40.7512 44.5409 41.787 44.5414C42.8227 44.542 43.8483 44.3396 44.8051 43.9458C45.7617 43.5521 46.6306 42.9749 47.3617 42.2472L48.1628 41.4581L59.2931 52.4969C55.8366 55.5408 51.3864 57.2415 46.7643 57.2847C42.1423 57.3278 37.6605 55.7105 34.1469 52.7316ZM63.2965 48.564L60.9089 50.9322L49.7539 39.8678L52.1426 37.5006C52.3539 37.2911 52.6404 37.1734 52.9392 37.1734C53.2381 37.1734 53.5246 37.2911 53.7359 37.5006L63.2965 46.9837C63.5078 47.1932 63.6264 47.4774 63.6264 47.7738C63.6264 48.0702 63.5078 48.3544 63.2965 48.564Z" fill="black" />
                <path d="M17.2472 44.3975C16.1329 44.3975 15.0436 44.7251 14.1172 45.3392C13.1907 45.9533 12.4685 46.8259 12.0421 47.8471C11.6158 48.8682 11.5041 49.9917 11.7216 51.0758C11.9389 52.1598 12.4755 53.1555 13.2634 53.9369C14.0513 54.7185 15.0551 55.2507 16.1481 55.4663C17.241 55.682 18.3737 55.5712 19.4031 55.1483C20.4327 54.7254 21.3124 54.0091 21.9316 53.0901C22.5506 52.1712 22.881 51.0908 22.881 49.9856C22.8792 48.5041 22.2851 47.0838 21.2289 46.0361C20.1727 44.9886 18.7408 44.3992 17.2472 44.3975ZM17.2472 53.3384C16.5786 53.3384 15.925 53.1417 15.3692 52.7734C14.8132 52.405 14.38 51.8813 14.1242 51.2686C13.8683 50.656 13.8014 49.9819 13.9317 49.3314C14.0622 48.6811 14.3841 48.0836 14.8569 47.6148C15.3296 47.1458 15.932 46.8265 16.5877 46.6971C17.2434 46.5678 17.9231 46.6342 18.5408 46.888C19.1584 47.1417 19.6864 47.5714 20.0578 48.1228C20.4293 48.6742 20.6275 49.3225 20.6275 49.9856C20.6275 50.8748 20.2713 51.7276 19.6374 52.3564C19.0035 52.9852 18.1437 53.3384 17.2472 53.3384Z" fill="black" />
                <path d="M38.8097 0.0152683C38.5135 -0.0250444 38.2134 0.0529879 37.9752 0.232188C37.7371 0.411387 37.5805 0.677091 37.5398 0.970836C37.4991 1.26458 37.5778 1.5623 37.7585 1.79852C37.9391 2.03473 38.2071 2.19008 38.5032 2.2304C45.2991 3.17286 51.6002 6.28624 56.4524 11.099C61.3045 15.9118 64.4434 22.1617 65.3936 28.9025C65.4306 29.1699 65.564 29.415 65.769 29.5925C65.974 29.77 66.237 29.8679 66.5091 29.8681C66.5604 29.8681 66.6115 29.8647 66.6623 29.858C66.8089 29.8381 66.9502 29.7897 67.078 29.7156C67.2058 29.6415 67.3177 29.5432 67.4071 29.4262C67.4966 29.3093 67.562 29.1759 67.5995 29.0339C67.637 28.8918 67.6459 28.7439 67.6257 28.5985C66.6074 21.3749 63.2437 14.6774 58.0441 9.51975C52.8445 4.3622 46.0922 1.02562 38.8097 0.0152683Z" fill="black" />
                <path d="M38.4612 9.01935C43.4644 9.89814 48.0746 12.2806 51.6674 15.8442C55.2603 19.408 57.6622 23.9806 58.5482 28.9432C58.5938 29.2024 58.7302 29.4372 58.9331 29.6065C59.1361 29.7757 59.3928 29.8686 59.658 29.8686C59.7234 29.8685 59.7886 29.8629 59.853 29.8518C60.1473 29.8009 60.4092 29.6359 60.581 29.3935C60.7528 29.151 60.8204 28.8507 60.769 28.5587C59.8034 23.1432 57.1828 18.153 53.2623 14.2642C49.3418 10.3754 44.3108 7.77575 38.8511 6.81763C38.7054 6.79224 38.556 6.79557 38.4115 6.82744C38.2671 6.85931 38.1304 6.91908 38.0091 7.00335C37.888 7.08762 37.7848 7.19473 37.7054 7.31859C37.6259 7.44243 37.5718 7.58058 37.5463 7.72514C37.5207 7.86971 37.5241 8.01786 37.5562 8.16114C37.5883 8.30442 37.6486 8.44002 37.7335 8.5602C37.8185 8.68038 37.9264 8.78275 38.0513 8.86154C38.1762 8.94033 38.3155 8.99398 38.4612 9.01935Z" fill="black" />
                <path d="M38.3886 15.8443C41.6005 16.6326 44.5345 18.2756 46.874 20.5963C49.2135 22.9171 50.8699 25.8274 51.6642 29.0133C51.6951 29.1598 51.7554 29.2986 51.8415 29.4216C51.9275 29.5446 52.0375 29.6492 52.1652 29.7291C52.2928 29.8091 52.4352 29.8628 52.5841 29.8871C52.733 29.9114 52.8853 29.9058 53.032 29.8706C53.1787 29.8354 53.3168 29.7714 53.438 29.6823C53.5593 29.5931 53.6612 29.4808 53.7378 29.3518C53.8145 29.2228 53.8642 29.0799 53.8841 28.9316C53.9039 28.7831 53.8936 28.6323 53.8536 28.488C52.9603 24.9031 51.0968 21.6284 48.4642 19.0171C45.8317 16.406 42.5302 14.5577 38.9159 13.6717C38.7708 13.6338 38.6196 13.6249 38.4711 13.6457C38.3226 13.6665 38.1797 13.7166 38.0509 13.7929C37.9221 13.8691 37.81 13.9702 37.7211 14.0901C37.6322 14.2099 37.5684 14.3461 37.5333 14.4908C37.4981 14.6355 37.4925 14.7856 37.5167 14.9325C37.5408 15.0793 37.5944 15.2199 37.674 15.346C37.7537 15.472 37.8579 15.581 37.9806 15.6666C38.1033 15.7522 38.242 15.8126 38.3886 15.8443Z" fill="black" />
                <path d="M40.9075 30.9859C41.7989 30.9859 42.6703 30.7237 43.4115 30.2325C44.1527 29.7413 44.7304 29.043 45.0715 28.2262C45.4127 27.4093 45.5019 26.5105 45.3279 25.6432C45.1541 24.7761 44.7248 23.9795 44.0944 23.3543C43.4641 22.7291 42.6611 22.3033 41.7868 22.1309C40.9124 21.9583 40.0063 22.0468 39.1827 22.3852C38.3592 22.7235 37.6552 23.2966 37.1599 24.0317C36.6647 24.7669 36.4004 25.6313 36.4004 26.5154C36.4004 27.7011 36.8752 28.8382 37.7205 29.6765C38.5657 30.5149 39.7121 30.9859 40.9075 30.9859ZM40.9075 24.2802C41.3532 24.2802 41.7888 24.4113 42.1594 24.6569C42.53 24.9025 42.8189 25.2516 42.9895 25.66C43.16 26.0685 43.2046 26.5179 43.1178 26.9515C43.0308 27.385 42.8161 27.7834 42.501 28.096C42.1858 28.4086 41.7842 28.6215 41.3471 28.7077C40.91 28.7939 40.4569 28.7497 40.045 28.5806C39.6333 28.4114 39.2813 28.1248 39.0338 27.7572C38.7861 27.3896 38.6539 26.9575 38.6539 26.5154C38.6539 25.9226 38.8913 25.3541 39.314 24.9349C39.7367 24.5157 40.3098 24.2802 40.9075 24.2802Z" fill="black" />
            </svg>

            } title='24 / 7 Support' subTitle='Dedicated support' />

        </div>
    )
}

export default PreFooter
import React from "react";

function Sidebar() {
    return (
        <aside className="flex flex-col h-screen shadow-lg bg-zinc-800 w-[150px] max-md:w-20 max-sm:w-[60px]">
            <div className="mx-auto mt-5 text-4xl font-bold bg-blue-900 rounded-3xl shadow-lg h-[90px] flex items-center justify-center text-stone-200 w-[105px] max-md:text-2xl max-md:w-[60px] max-sm:text-xl max-sm:w-[50px]">
                DBM.
            </div>
            <nav className="flex flex-col gap-5 mt-10">
                <NavButton active>
                    <svg
                        width="50"
                        height="50"
                        viewBox="0 0 90 90"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-[50px] h-[50px] max-lg:w-[30px] max-lg:h-[30px]"
                    >
                        <g filter="url(#filter0_ii_182_766)">
                            <rect width="90" height="90" rx="12.446" fill="#2C2F33"></rect>
                        </g>
                        <path
                            d="M40.9013 26.9609H29.4205C28.0621 26.9609 26.9609 28.0621 26.9609 29.4205V35.9805C26.9609 37.3389 28.0621 38.4402 29.4205 38.4402H40.9013C42.2597 38.4402 43.3609 37.3389 43.3609 35.9805V29.4205C43.3609 28.0621 42.2597 26.9609 40.9013 26.9609Z"
                            fill="white"
                        ></path>
                        <path
                            d="M40.9012 27.7461H29.4204C28.4952 27.7461 27.7451 28.4961 27.7451 29.4214V35.9814C27.7451 36.9066 28.4952 37.6567 29.4204 37.6567H40.9012C41.8264 37.6567 42.5765 36.9066 42.5765 35.9814V29.4214C42.5765 28.4961 41.8264 27.7461 40.9012 27.7461Z"
                            stroke="white"
                            strokeMiterlimit="10"
                        ></path>
                        <path
                            d="M60.3979 26.9609H48.9171C47.5587 26.9609 46.4575 28.0621 46.4575 29.4205V45.8205C46.4575 47.1789 47.5587 48.2802 48.9171 48.2802H60.3979C61.7563 48.2802 62.8575 47.1789 62.8575 45.8205V29.4205C62.8575 28.0621 61.7563 26.9609 60.3979 26.9609Z"
                            fill="#1A91FA"
                        ></path>
                        <path
                            d="M40.9013 41.7188H29.4205C28.0621 41.7188 26.9609 42.82 26.9609 44.1784V60.5784C26.9609 61.9368 28.0621 63.038 29.4205 63.038H40.9013C42.2597 63.038 43.3609 61.9368 43.3609 60.5784V44.1784C43.3609 42.82 42.2597 41.7188 40.9013 41.7188Z"
                            fill="#1A91FA"
                        ></path>
                        <path
                            d="M60.3979 51.5586H48.9171C47.5587 51.5586 46.4575 52.6598 46.4575 54.0182V60.5782C46.4575 61.9366 47.5587 63.0378 48.9171 63.0378H60.3979C61.7563 63.0378 62.8575 61.9366 62.8575 60.5782V54.0182C62.8575 52.6598 61.7563 51.5586 60.3979 51.5586Z"
                            fill="white"
                        ></path>
                        <path
                            d="M60.3978 52.3438H48.917C47.9918 52.3438 47.2417 53.0938 47.2417 54.019V60.579C47.2417 61.5043 47.9918 62.2543 48.917 62.2543H60.3978C61.323 62.2543 62.0731 61.5043 62.0731 60.579V54.019C62.0731 53.0938 61.323 52.3438 60.3978 52.3438Z"
                            stroke="white"
                            strokeMiterlimit="10"
                        ></path>
                        <defs>
                            <filter
                                id="filter0_ii_182_766"
                                x="-6.22302"
                                y="-6.22302"
                                width="99.9568"
                                height="99.9568"
                                filterUnits="userSpaceOnUse"
                                colorInterpolationFilters="sRGB"
                            >
                                <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
                                <feBlend
                                    mode="normal"
                                    in="SourceGraphic"
                                    in2="BackgroundImageFix"
                                    result="shape"
                                ></feBlend>
                                <feColorMatrix
                                    in="SourceAlpha"
                                    type="matrix"
                                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                    result="hardAlpha"
                                ></feColorMatrix>
                                <feOffset dx="3.73381" dy="3.73381"></feOffset>
                                <feGaussianBlur stdDeviation="3.11151"></feGaussianBlur>
                                <feComposite
                                    in2="hardAlpha"
                                    operator="arithmetic"
                                    k2="-1"
                                    k3="1"
                                ></feComposite>
                                <feColorMatrix
                                    type="matrix"
                                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0"
                                ></feColorMatrix>
                                <feBlend
                                    mode="normal"
                                    in2="shape"
                                    result="effect1_innerShadow_182_766"
                                ></feBlend>
                                <feColorMatrix
                                    in="SourceAlpha"
                                    type="matrix"
                                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                    result="hardAlpha"
                                ></feColorMatrix>
                                <feOffset dx="-6.22302" dy="-6.22302"></feOffset>
                                <feGaussianBlur stdDeviation="3.11151"></feGaussianBlur>
                                <feComposite
                                    in2="hardAlpha"
                                    operator="arithmetic"
                                    k2="-1"
                                    k3="1"
                                ></feComposite>
                                <feColorMatrix
                                    type="matrix"
                                    values="0 0 0 0 0.231373 0 0 0 0 0.266667 0 0 0 0 0.317647 0 0 0 1 0"
                                ></feColorMatrix>
                                <feBlend
                                    mode="normal"
                                    in2="effect1_innerShadow_182_766"
                                    result="effect2_innerShadow_182_766"
                                ></feBlend>
                            </filter>
                        </defs>
                    </svg>
                    <span className="sr-only">Dashboard</span>
                </NavButton>

                <NavButton>
                    <svg
                        width="35"
                        height="35"
                        viewBox="0 0 35 35"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-[35px] h-[35px] max-lg:w-[25px] max-lg:h-[25px]"
                    >
                        <path
                            d="M7.35 28H10.85C11.0425 28 11.2 27.8425 11.2 27.65V7.35C11.2 7.1575 11.0425 7 10.85 7H7.35C7.1575 7 7 7.1575 7 7.35V27.65C7 27.8425 7.1575 28 7.35 28ZM15.75 15.75H19.25C19.4425 15.75 19.6 15.5925 19.6 15.4V7.35C19.6 7.1575 19.4425 7 19.25 7H15.75C15.5575 7 15.4 7.1575 15.4 7.35V15.4C15.4 15.5925 15.5575 15.75 15.75 15.75ZM24.15 18.9H27.65C27.8425 18.9 28 18.7425 28 18.55V7.35C28 7.1575 27.8425 7 27.65 7H24.15C23.9575 7 23.8 7.1575 23.8 7.35V18.55C23.8 18.7425 23.9575 18.9 24.15 18.9ZM33.6 0H1.4C0.625625 0 0 0.625625 0 1.4V33.6C0 34.3744 0.625625 35 1.4 35H33.6C34.3744 35 35 34.3744 35 33.6V1.4C35 0.625625 34.3744 0 33.6 0ZM31.85 31.85H3.15V3.15H31.85V31.85Z"
                            fill="#CEDBDC"
                        ></path>
                    </svg>
                    <span className="sr-only">Analytics</span>
                </NavButton>

                <NavButton>
                    <svg
                        width="90"
                        height="90"
                        viewBox="0 0 139 140"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-[90px] h-[90px] max-lg:w-[60px] max-lg:h-[60px]"
                    >
                        <g filter="url(#filter0_dd_182_746)">
                            <rect
                                x="24"
                                y="25"
                                width="90"
                                height="90"
                                rx="12.446"
                                fill="#2C2F33"
                            ></rect>
                        </g>
                        <path
                            d="M77.3447 57.2734C76.548 57.2734 75.7692 57.5097 75.1067 57.9523C74.4443 58.395 73.9279 59.0241 73.623 59.7602C73.3182 60.4963 73.2384 61.3062 73.3938 62.0877C73.5492 62.8691 73.9329 63.5869 74.4963 64.1502C75.0597 64.7136 75.7774 65.0973 76.5589 65.2527C77.3403 65.4081 78.1502 65.3284 78.8863 65.0235C79.6224 64.7186 80.2515 64.2023 80.6942 63.5398C81.1368 62.8773 81.3731 62.0985 81.3731 61.3018C81.3704 60.2342 80.9451 59.2112 80.1902 58.4563C79.4353 57.7014 78.4123 57.2761 77.3447 57.2734V57.2734Z"
                            stroke="#CEDBDC"
                            strokeWidth="1.4"
                            strokeMiterlimit="10"
                        ></path>
                        <path
                            d="M62.7534 55C61.638 55 60.5476 55.3308 59.6202 55.9505C58.6928 56.5702 57.9699 57.4509 57.5431 58.4815C57.1162 59.512 57.0045 60.6459 57.2221 61.7399C57.4397 62.8339 57.9769 63.8388 58.7656 64.6275C59.5543 65.4162 60.5592 65.9534 61.6532 66.171C62.7472 66.3886 63.8811 66.2769 64.9117 65.85C65.9422 65.4232 66.823 64.7003 67.4427 63.7729C68.0624 62.8455 68.3931 61.7551 68.3931 60.6397C68.39 59.1449 67.7948 57.7122 66.7379 56.6552C65.6809 55.5983 64.2482 55.0031 62.7534 55V55Z"
                            stroke="#CEDBDC"
                            strokeWidth="1.6"
                            strokeMiterlimit="10"
                        ></path>
                        <path
                            d="M76.3648 82.1264L75.4756 74.9574L71.6992 72.58L69.3745 71.9164C69.3745 71.9164 69.6148 71.7333 69.7422 71.644C69.8164 71.5922 69.8921 71.5434 69.9692 71.4975L68.0972 70.3124C68.0972 70.3124 68.4077 70.0751 68.5718 69.9608C70.8207 68.4976 73.4566 67.742 76.1392 67.7914C78.8221 67.7413 81.4585 68.4965 83.7081 69.9594C84.6144 70.5071 85.373 71.2683 85.9176 72.1765C86.4622 73.0847 86.7764 74.1124 86.8326 75.1698V82.1264H76.3648Z"
                            fill="#CEDBDC"
                        ></path>
                        <path
                            d="M62.8194 70.161C66.2975 70.0852 69.7359 70.9119 72.7994 72.5605C75.2896 74.0253 76.6373 75.9164 76.6373 77.8339V84.9985H49V77.8383C49 75.915 50.3521 74.0224 52.8379 72.5649C55.9014 70.9145 59.3404 70.0863 62.8194 70.161V70.161Z"
                            stroke="#CEDBDC"
                            strokeWidth="1.6"
                            strokeMiterlimit="10"
                        ></path>
                        <path
                            d="M72.5943 71.1016C72.5943 71.1016 71.6494 70.6885 70.8496 70.353C70.2241 70.0908 68.7769 69.7188 68.7769 69.7188L71.6626 68.2539L75.1167 70.1582L72.5943 71.1016Z"
                            fill="#1F2124"
                        ></path>
                        <path
                            d="M79.8569 79.5898H77.8091V82.5195H79.8569V79.5898Z"
                            fill="#1F2124"
                        ></path>
                        <defs>
                            <filter
                                id="filter0_dd_182_746"
                                x="-0.892087"
                                y="0.107913"
                                width="139.784"
                                height="139.784"
                                filterUnits="userSpaceOnUse"
                                colorInterpolationFilters="sRGB"
                            >
                                <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
                                <feColorMatrix
                                    in="SourceAlpha"
                                    type="matrix"
                                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                    result="hardAlpha"
                                ></feColorMatrix>
                                <feOffset dx="6.22302" dy="6.22302"></feOffset>
                                <feGaussianBlur stdDeviation="9.33453"></feGaussianBlur>
                                <feColorMatrix
                                    type="matrix"
                                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0"
                                ></feColorMatrix>
                                <feBlend
                                    mode="normal"
                                    in2="BackgroundImageFix"
                                    result="effect1_dropShadow_182_746"
                                ></feBlend>
                                <feColorMatrix
                                    in="SourceAlpha"
                                    type="matrix"
                                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                    result="hardAlpha"
                                ></feColorMatrix>
                                <feOffset dx="-6.22302" dy="-6.22302"></feOffset>
                                <feGaussianBlur stdDeviation="9.33453"></feGaussianBlur>
                                <feColorMatrix
                                    type="matrix"
                                    values="0 0 0 0 0.231373 0 0 0 0 0.266667 0 0 0 0 0.317647 0 0 0 1 0"
                                ></feColorMatrix>
                                <feBlend
                                    mode="normal"
                                    in2="effect1_dropShadow_182_746"
                                    result="effect2_dropShadow_182_746"
                                ></feBlend>
                                <feBlend
                                    mode="normal"
                                    in="SourceGraphic"
                                    in2="effect2_dropShadow_182_746"
                                    result="shape"
                                ></feBlend>
                            </filter>
                        </defs>
                    </svg>
                    <span className="sr-only">Team Members</span>
                </NavButton>

                <NavButton>
                    <svg
                        width="90"
                        height="90"
                        viewBox="0 0 139 140"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-[90px] h-[90px] max-lg:w-[60px] max-lg:h-[60px]"
                    >
                        <g filter="url(#filter0_dd_182_742)">
                            <rect
                                x="24"
                                y="25"
                                width="90"
                                height="90"
                                rx="12.446"
                                fill="#2C2F33"
                            ></rect>
                        </g>
                        <path
                            d="M65.4206 74.8936L64.8749 78.1334C64.8378 78.3505 64.8621 78.5736 64.9451 78.7775C65.0281 78.9815 65.1664 79.1582 65.3446 79.2877C65.5227 79.4171 65.7335 79.4942 65.9531 79.5102C66.1727 79.5262 66.3924 79.4805 66.5874 79.3782L69.5013 77.8574L72.4152 79.3782C72.6103 79.4803 72.8301 79.5259 73.0497 79.5099C73.2693 79.4938 73.4801 79.4168 73.6582 79.2874C73.8364 79.1579 73.9749 78.9814 74.0581 78.7775C74.1413 78.5736 74.1658 78.3505 74.1291 78.1334L73.5821 74.8949L75.9285 72.5944C76.0858 72.4404 76.197 72.2456 76.2495 72.0318C76.302 71.818 76.2938 71.5939 76.2258 71.3845C76.1578 71.1751 76.0327 70.9889 75.8645 70.8469C75.6964 70.7048 75.4919 70.6124 75.2742 70.5803L72.0229 70.0959L70.5583 67.1565C70.4604 66.9593 70.3094 66.7934 70.1223 66.6774C69.9353 66.5614 69.7195 66.5 69.4994 66.5C69.2793 66.5 69.0636 66.5614 68.8765 66.6774C68.6894 66.7934 68.5385 66.9593 68.4406 67.1565L66.9785 70.0959L63.7272 70.5777C63.5095 70.6099 63.305 70.7022 63.1369 70.8443C62.9687 70.9864 62.8436 71.1726 62.7756 71.3819C62.7076 71.5913 62.6994 71.8155 62.7519 72.0293C62.8044 72.243 62.9156 72.4379 63.0729 72.5919L65.4206 74.8936Z"
                            fill="#CEDBDC"
                        ></path>
                        <path
                            d="M83.4688 55.7804H79.7498V53.7151C79.7498 53.4898 79.7054 53.2666 79.6191 53.0585C79.5328 52.8503 79.4064 52.6612 79.247 52.5019C79.0876 52.3426 78.8983 52.2163 78.6901 52.1302C78.4819 52.0441 78.2587 51.9998 78.0334 52H77.7612C77.3063 52 76.87 52.1807 76.5484 52.5023C76.2267 52.824 76.046 53.2602 76.046 53.7151V55.7804H62.9131V53.7151C62.9131 53.2602 62.7324 52.824 62.4107 52.5023C62.0891 52.1807 61.6528 52 61.1979 52H60.9257C60.7004 51.9998 60.4772 52.0441 60.269 52.1302C60.0608 52.2163 59.8715 52.3426 59.7121 52.5019C59.5527 52.6612 59.4263 52.8503 59.34 53.0585C59.2537 53.2666 59.2093 53.4898 59.2093 53.7151V55.7804H55.5312C54.595 55.7814 53.6974 56.1538 53.0354 56.8158C52.3734 57.4778 52.001 58.3754 52 59.3116V84.0286C52.0014 84.9647 52.3738 85.8621 53.0358 86.524C53.6977 87.186 54.5951 87.5584 55.5312 87.5598H83.4688C84.4049 87.5584 85.3023 87.186 85.9642 86.524C86.6262 85.8621 86.9986 84.9647 87 84.0286V59.3116C86.9986 58.3755 86.6262 57.4781 85.9642 56.8162C85.3023 56.1542 84.4049 55.7818 83.4688 55.7804ZM83.0113 83.5672H55.9913V64.3266H83.0113V83.5672Z"
                            fill="#CEDBDC"
                        ></path>
                        <defs>
                            <filter
                                id="filter0_dd_182_742"
                                x="-0.892087"
                                y="0.107913"
                                width="139.784"
                                height="139.784"
                                filterUnits="userSpaceOnUse"
                                colorInterpolationFilters="sRGB"
                            >
                                <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
                                <feColorMatrix
                                    in="SourceAlpha"
                                    type="matrix"
                                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                    result="hardAlpha"
                                ></feColorMatrix>
                                <feOffset dx="6.22302" dy="6.22302"></feOffset>
                                <feGaussianBlur stdDeviation="9.33453"></feGaussianBlur>
                                <feColorMatrix
                                    type="matrix"
                                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0"
                                ></feColorMatrix>
                                <feBlend
                                    mode="normal"
                                    in2="BackgroundImageFix"
                                    result="effect1_dropShadow_182_742"
                                ></feBlend>
                                <feColorMatrix
                                    in="SourceAlpha"
                                    type="matrix"
                                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                    result="hardAlpha"
                                ></feColorMatrix>
                                <feOffset dx="-6.22302" dy="-6.22302"></feOffset>
                                <feGaussianBlur stdDeviation="9.33453"></feGaussianBlur>
                                <feColorMatrix
                                    type="matrix"
                                    values="0 0 0 0 0.231373 0 0 0 0 0.266667 0 0 0 0 0.317647 0 0 0 1 0"
                                ></feColorMatrix>
                                <feBlend
                                    mode="normal"
                                    in2="effect1_dropShadow_182_742"
                                    result="effect2_dropShadow_182_742"
                                ></feBlend>
                                <feBlend
                                    mode="normal"
                                    in="SourceGraphic"
                                    in2="effect2_dropShadow_182_742"
                                    result="shape"
                                ></feBlend>
                            </filter>
                        </defs>
                    </svg>
                    <span className="sr-only">Calendar</span>
                </NavButton>

                <NavButton>
                    <svg
                        width="35"
                        height="35"
                        className="w-[35px] h-[35px] max-lg:w-[25px] max-lg:h-[25px]"
                    ></svg>
                    <span className="sr-only">Settings</span>
                </NavButton>

                <NavButton>
                    <svg
                        width="90"
                        height="90"
                        viewBox="0 0 90 90"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-[90px] h-[90px] max-lg:w-[60px] max-lg:h-[60px]"
                    >
                        <g filter="url(#filter0_ii_182_731)">
                            <rect width="90" height="90" rx="12.446" fill="#2C2F33"></rect>
                        </g>
                        <path
                            d="M61.7167 46.1268L61.7306 46.1129C61.7519 46.0887 61.7709 46.0627 61.7875 46.0351C61.7945 46.0282 61.7945 46.0212 61.8014 46.0143C61.8153 45.9865 61.8376 45.9573 61.8514 45.9296C61.8522 45.9243 61.8547 45.9194 61.8584 45.9157C61.8723 45.8879 61.8862 45.8587 61.9014 45.824C61.9014 45.8171 61.9014 45.8171 61.9084 45.8101C61.9223 45.7823 61.9292 45.7462 61.9445 45.7115C61.9445 45.7045 61.9445 45.6976 61.9514 45.6976C61.9617 45.6655 61.9687 45.6325 61.9723 45.599C61.971 45.5865 61.9734 45.574 61.9792 45.5629C61.9862 45.5351 61.9862 45.5059 61.9931 45.4782C62.0025 45.3983 62.0025 45.3177 61.9931 45.2379C61.9919 45.2092 61.9873 45.1807 61.9792 45.1531C61.9805 45.1407 61.9781 45.1281 61.9723 45.117C61.9653 45.0809 61.9584 45.0531 61.9514 45.0184C61.9514 45.0115 61.9514 45.0045 61.9445 45.0045C61.9356 44.9706 61.9235 44.9376 61.9084 44.9059C61.9084 44.899 61.9084 44.899 61.9014 44.892C61.8876 44.8642 61.8737 44.8281 61.8584 44.8004C61.8576 44.7951 61.8552 44.7902 61.8514 44.7865C61.8374 44.7567 61.8207 44.7284 61.8014 44.7017C61.7945 44.6948 61.7945 44.6878 61.7875 44.6809C61.7703 44.6538 61.7513 44.6278 61.7306 44.6031L61.7167 44.5892C61.6905 44.5555 61.6622 44.5235 61.632 44.4934L54.6234 37.4876C54.3934 37.2669 54.0862 37.1452 53.7675 37.1485C53.4488 37.1518 53.1441 37.2799 52.9187 37.5052C52.6934 37.7306 52.5653 38.0353 52.562 38.3539C52.5587 38.6726 52.6805 38.9799 52.9011 39.2099L57.8332 44.142H38.2256C37.9033 44.142 37.5941 44.27 37.3662 44.498C37.1383 44.7259 37.0103 45.035 37.0103 45.3573C37.0103 45.6796 37.1383 45.9888 37.3662 46.2167C37.5941 46.4446 37.9033 46.5726 38.2256 46.5726H57.8402L52.9428 51.47C52.8297 51.5827 52.7399 51.7165 52.6785 51.8638C52.6171 52.0111 52.5854 52.1691 52.5851 52.3287C52.5844 52.6511 52.7118 52.9605 52.9393 53.1889C53.0519 53.3019 53.1857 53.3917 53.3331 53.4531C53.4804 53.5145 53.6384 53.5462 53.798 53.5466C54.1203 53.5472 54.4297 53.4198 54.6581 53.1923L61.6237 46.2268C61.6598 46.1837 61.6875 46.1601 61.7167 46.1268Z"
                            fill="#1A91FA"
                            stroke="#1A91FA"
                            strokeWidth="0.2"
                            strokeMiterlimit="10"
                        ></path>
                        <path
                            d="M33.5975 30.4306H42.6686C42.991 30.4306 43.3001 30.3026 43.528 30.0747C43.7559 29.8468 43.884 29.5376 43.884 29.2153C43.884 28.893 43.7559 28.5839 43.528 28.356C43.3001 28.128 42.991 28 42.6686 28H33.5975C31.8486 28.0029 30.1722 28.699 28.9356 29.9356C27.699 31.1722 27.0029 32.8486 27 34.5975V56.1191C27.0029 57.8679 27.699 59.5443 28.9356 60.781C30.1722 62.0176 31.8486 62.7136 33.5975 62.7166H42.5186C42.841 62.7166 43.1501 62.5885 43.378 62.3606C43.6059 62.1327 43.7339 61.8236 43.7339 61.5012C43.7339 61.1789 43.6059 60.8698 43.378 60.6419C43.1501 60.414 42.841 60.2859 42.5186 60.2859H33.5975C32.4924 60.2859 31.4325 59.8469 30.6511 59.0655C29.8696 58.284 29.4306 57.2242 29.4306 56.1191V34.5975C29.4306 33.4924 29.8696 32.4325 30.6511 31.6511C31.4325 30.8696 32.4924 30.4306 33.5975 30.4306Z"
                            fill="#1A91FA"
                            stroke="#1A91FA"
                            strokeWidth="0.2"
                            strokeMiterlimit="10"
                        ></path>
                        <defs>
                            <filter
                                id="filter0_ii_182_731"
                                x="-6.22302"
                                y="-6.22302"
                                width="99.9568"
                                height="99.9568"
                                filterUnits="userSpaceOnUse"
                                colorInterpolationFilters="sRGB"
                            >
                                <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
                                <feBlend
                                    mode="normal"
                                    in="SourceGraphic"
                                    in2="BackgroundImageFix"
                                    result="shape"
                                ></feBlend>
                                <feColorMatrix
                                    in="SourceAlpha"
                                    type="matrix"
                                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                    result="hardAlpha"
                                ></feColorMatrix>
                                <feOffset dx="3.73381" dy="3.73381"></feOffset>
                                <feGaussianBlur stdDeviation="3.11151"></feGaussianBlur>
                                <feComposite
                                    in2="hardAlpha"
                                    operator="arithmetic"
                                    k2="-1"
                                    k3="1"
                                ></feComposite>
                                <feColorMatrix
                                    type="matrix"
                                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0"
                                ></feColorMatrix>
                                <feBlend
                                    mode="normal"
                                    in2="shape"
                                    result="effect1_innerShadow_182_731"
                                ></feBlend>
                                <feColorMatrix
                                    in="SourceAlpha"
                                    type="matrix"
                                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                    result="hardAlpha"
                                ></feColorMatrix>
                                <feOffset dx="-6.22302" dy="-6.22302"></feOffset>
                                <feGaussianBlur stdDeviation="3.11151"></feGaussianBlur>
                                <feComposite
                                    in2="hardAlpha"
                                    operator="arithmetic"
                                    k2="-1"
                                    k3="1"
                                ></feComposite>
                                <feColorMatrix
                                    type="matrix"
                                    values="0 0 0 0 0.231373 0 0 0 0 0.266667 0 0 0 0 0.317647 0 0 0 1 0"
                                ></feColorMatrix>
                                <feBlend
                                    mode="normal"
                                    in2="effect1_innerShadow_182_731"
                                    result="effect2_innerShadow_182_731"
                                ></feBlend>
                            </filter>
                        </defs>
                    </svg>
                    <span className="sr-only">Logout</span>
                </NavButton>
            </nav>
        </aside>
    );
}

function NavButton({ children, active }) {
    return (
        <button
            className={`flex justify-center items-center mx-auto rounded-xl shadow-lg ${active ? "bg-zinc-800" : "bg-zinc-800"} h-[90px] w-[90px] max-md:h-[60px] max-md:w-[60px] focus:outline-none focus:ring-2 focus:ring-blue-500`}
            aria-pressed={active ? "true" : "false"}
        >
            {children}
        </button>
    );
}

export default Sidebar;

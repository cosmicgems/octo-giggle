import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { loginWithGoogle } from "../../actions/auth";
import React from "react";
import { GOOGLE_CLIENT_ID } from "../../config";

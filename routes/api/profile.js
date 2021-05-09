const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const Profile = require("../../models/Profile");
const { check, validationResult } = require("express-validator/check")

// @route  GET api/profile/me
// @desc   Get current userprofile
// @access Private

router.get('/me', auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id }).populate('user', ['name', 'avatar'])
        if (!profile) {
            return res.status(400).json({ msg: 'There is no profile for this user' })    // Error messages
        }
        res.json(profile)
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server Error 500')
    }
});

// @route  POST api/profile
// @desc   Create or update User profile
// @access Private

router.post('/', [auth, [
    check('status', 'Status is required').not().isEmpty(),
    check('skills', 'Skill is required').not().isEmpty()
]], async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    const {
        company,
        website,
        location,
        bio,
        status,
        githubusername,
        skills,
        youtube,
        facebook,
        twitter,
        instagram,
        linkedin
    } = res.body;

    //Build profile Object
    const profileFields = {}
    profileFields.user = req.user.id
    if (company) profileFields.company = company
    if (website) profileFields.company = website
    if (location) profileFields.company = location
    if (bio) profileFields.company = bio
    if (status) profileFields.company = status
    if (githubusername) profileFields.company = githubusername
    if (skills) profileFields.company = skills
    if (youtube) profileFields.company = youtube
    if (facebook) profileFields.company = facebook
    if (twitter) profileFields.company = twitter
    if (instagram) profileFields.company = instagram
    if (linkedin) profileFields.company = linkedin
})

module.exports = router;
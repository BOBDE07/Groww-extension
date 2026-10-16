import explainFund from "../services/fund.service.js";

const fundController = async (req, res) => {
    try {
        const { fundName, riskLevel, expenseRatio, minimumInvestment, fundManager } = req.body;

        if (!fundName?.trim() ||
            !riskLevel?.trim() ||
            expenseRatio === undefined ||
            expenseRatio === null ||
            minimumInvestment === undefined ||
            minimumInvestment === null ||
            !fundManager?.trim()) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required',
            });
        }

        const fundData = {
            fundName,
            riskLevel,
            expenseRatio,
            minimumInvestment,
            fundManager
        }
        const result = await explainFund(fundData);


        res.status(200).json({
            success: true,
            message: 'Fund Data found',
            result
        })

    } catch (error) {
        console.log('Error in fund controller', error);

        return res.status(500).json({
            success: false,
            message: error.message || 'Internal Serve error',

        })

    }
}

export default fundController; 